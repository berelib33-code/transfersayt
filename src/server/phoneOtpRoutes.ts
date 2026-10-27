import { Express, Request, Response } from 'express';
import { normalizePhone } from '../utils/phone.ts';
import {
  assertCanCheckOtp,
  assertCanSendOtp,
  otpResendCooldownSec,
  recordOtpFail,
  recordOtpSend,
  recordOtpSuccess,
} from './otpRateLimit.ts';
import { checkTwilioSmsOtp, mapTwilioVerifyError, sendTwilioSmsOtp } from './twilioVerify.ts';

const VERIFIED_TTL_MS = 10 * 60 * 1000;
const verifiedPhones = new Map<string, number>();

function clientIp(req: Request): string {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.trim()) return fwd.split(',')[0].trim();
  return req.socket.remoteAddress || 'unknown';
}

export function consumePhoneOtpVerification(phone: string): boolean {
  const exp = verifiedPhones.get(phone);
  if (!exp || Date.now() > exp) {
    verifiedPhones.delete(phone);
    return false;
  }
  verifiedPhones.delete(phone);
  return true;
}

export function registerPhoneOtpRoutes(app: Express) {
  app.post('/api/otp/send', async (req: Request, res: Response) => {
    try {
      const phone = normalizePhone(String(req.body?.phone || ''));
      if (!phone) {
        return res.status(400).json({ error: 'Düzgün mobil nömrə daxil edin (+90 və ya +994)' });
      }

      const allowed = assertCanSendOtp(phone, clientIp(req));
      if (!allowed.ok) {
        return res.status(429).json({ error: allowed.error, retryAfterSec: otpResendCooldownSec(phone) });
      }

      await sendTwilioSmsOtp(phone);
      recordOtpSend(phone, clientIp(req));
      return res.json({
        success: true,
        message: 'Təsdiq kodu SMS ilə göndərildi.',
        retryAfterSec: otpResendCooldownSec(phone),
      });
    } catch (err) {
      const mapped = mapTwilioVerifyError(err);
      console.warn('OTP send failed', mapped.error);
      return res.status(mapped.status).json({ error: mapped.error });
    }
  });

  app.post('/api/otp/verify', async (req: Request, res: Response) => {
    try {
      const phone = normalizePhone(String(req.body?.phone || ''));
      const code = String(req.body?.code || '').replace(/\s/g, '');

      if (!phone) {
        return res.status(400).json({ error: 'Düzgün mobil nömrə daxil edin (+90 və ya +994)' });
      }
      if (!/^\d{4,8}$/.test(code)) {
        return res.status(400).json({ error: 'SMS kodu düzgün formatda deyil.' });
      }

      const allowed = assertCanCheckOtp(phone);
      if (!allowed.ok) {
        return res.status(429).json({ error: allowed.error });
      }

      const approved = await checkTwilioSmsOtp(phone, code);
      if (!approved) {
        recordOtpFail(phone);
        return res.status(400).json({ error: 'Kod səhvdir və ya vaxtı bitib.' });
      }

      recordOtpSuccess(phone);
      verifiedPhones.set(phone, Date.now() + VERIFIED_TTL_MS);
      return res.json({ success: true, message: 'Telefon nömrəsi təsdiqləndi.' });
    } catch (err) {
      recordOtpFail(normalizePhone(String(req.body?.phone || '')) || 'unknown');
      const mapped = mapTwilioVerifyError(err);
      console.warn('OTP verify failed', mapped.error);
      return res.status(mapped.status).json({ error: mapped.error });
    }
  });
}
