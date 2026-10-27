import twilio from 'twilio';

type TwilioClient = ReturnType<typeof twilio>;

function getVerifyClient(): { client: TwilioClient; serviceSid: string } {
  const accountSid = process.env.TWILIO_ACCOUNT_SID?.trim();
  const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID?.trim();
  const apiKeySid = process.env.TWILIO_API_KEY_SID?.trim();
  const apiKeySecret = process.env.TWILIO_API_KEY_SECRET?.trim();
  const authToken = process.env.TWILIO_AUTH_TOKEN?.trim();

  if (!accountSid) {
    throw new Error('TWILIO_ACCOUNT_SID .env faylında yoxdur');
  }
  if (!serviceSid || !serviceSid.startsWith('VA')) {
    throw new Error('TWILIO_VERIFY_SERVICE_SID .env faylında VA ilə başlayan real Service SID olmalıdır');
  }

  const client =
    apiKeySid && apiKeySecret
      ? twilio(apiKeySid, apiKeySecret, { accountSid })
      : authToken
        ? twilio(accountSid, authToken)
        : null;

  if (!client) {
    throw new Error('Twilio üçün TWILIO_AUTH_TOKEN və ya API Key .env-də doldurulmalıdır');
  }

  return { client, serviceSid };
}

export function mapTwilioVerifyError(err: unknown): { status: number; error: string } {
  const code =
    err && typeof err === 'object' && 'code' in err ? Number((err as { code?: number }).code) : 0;
  const status =
    err && typeof err === 'object' && 'status' in err ? Number((err as { status?: number }).status) : 0;

  if (code === 20003 || status === 401) {
    return { status: 503, error: 'Twilio identifikasiyası uğursuz oldu. .env açarlarını yoxlayın.' };
  }
  if (code === 20404) {
    return { status: 503, error: 'Twilio Verify Service tapılmadı. VA Service SID-i yoxlayın.' };
  }
  if (code === 60200 || code === 60202) {
    return { status: 400, error: 'Telefon nömrəsi və ya kod düzgün deyil.' };
  }
  if (code === 60203) {
    return { status: 429, error: 'Bu nömrə üçün SMS limiti doldu. Bir az sonra yenidən cəhd edin.' };
  }
  if (code === 21608 || code === 21211 || code === 21408 || code === 21612) {
    return {
      status: 400,
      error:
        'Bu ölkəyə SMS göndərmək üçün Twilio-da Geographic Permissions və ödənişli (trial olmayan) hesab lazımdır.',
    };
  }
  return { status: 502, error: 'SMS xidməti hazırda əlçatan deyil. Bir az sonra yenidən cəhd edin.' };
}

export async function sendTwilioSmsOtp(e164: string): Promise<void> {
  const { client, serviceSid } = getVerifyClient();
  const locale = e164.startsWith('+994') ? 'az' : e164.startsWith('+90') ? 'tr' : undefined;
  await client.verify.v2.services(serviceSid).verifications.create({
    to: e164,
    channel: 'sms',
    ...(locale ? { locale } : {}),
  });
}

export async function checkTwilioSmsOtp(e164: string, code: string): Promise<boolean> {
  const { client, serviceSid } = getVerifyClient();
  const result = await client.verify.v2.services(serviceSid).verificationChecks.create({
    to: e164,
    code,
  });
  return result.status === 'approved';
}
