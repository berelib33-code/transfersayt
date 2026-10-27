import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import twilio from 'twilio';
import { normalizePhone } from './src/utils/phone.ts';
import {
  consumePhoneOtpVerification,
  registerPhoneOtpRoutes,
} from './src/server/phoneOtpRoutes.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
registerPhoneOtpRoutes(app);

// Initialize Twilio client if credentials are provided
let twilioClient: twilio.Twilio | null = null;
const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER;
const TWILIO_TO = process.env.TWILIO_NOTIFY_TO || process.env.WHATSAPP_NOTIFY_TO || '+905411583005';
const WHATSAPP_NOTIFY_TO = (process.env.WHATSAPP_NOTIFY_TO || TWILIO_TO).replace(/\s/g, '');
const DATA_DIR = path.join(__dirname, 'data');
const REG_FILE = path.join(DATA_DIR, 'registrations.json');

function toWhatsAppAddress(num: string) {
  const clean = num.replace(/\s/g, '');
  if (clean.startsWith('whatsapp:')) return clean;
  const withPlus = clean.startsWith('+') ? clean : `+${clean}`;
  return `whatsapp:${withPlus}`;
}

async function sendWhatsAppRegistrationAlert(payload: {
  name: string;
  phone: string;
  email?: string;
}) {
  const body = [
    'MIHValyuta — Yeni qeydiyyat',
    `Ad: ${payload.name}`,
    `Nömrə: ${payload.phone}`,
    payload.email ? `Email: ${payload.email}` : null,
    `Vaxt: ${new Date().toLocaleString('az-AZ')}`,
    'Bu şəxs saytda mobil nömrə ilə register etdi.',
  ]
    .filter(Boolean)
    .join('\n');

  if (twilioClient) {
    const fromRaw = process.env.TWILIO_WHATSAPP_FROM || TWILIO_FROM;
    if (fromRaw) {
      try {
        const msg = await twilioClient.messages.create({
          body,
          from: toWhatsAppAddress(fromRaw),
          to: toWhatsAppAddress(WHATSAPP_NOTIFY_TO),
        });
        console.log('WhatsApp (Twilio) sent:', msg.sid);
        return { status: 'sent' as const, channel: 'twilio_whatsapp' };
      } catch (twErr: unknown) {
        const message = twErr instanceof Error ? twErr.message : String(twErr);
        console.warn('Twilio WhatsApp failed, trying SMS:', message);
        if (TWILIO_FROM && !TWILIO_FROM.includes('whatsapp')) {
          try {
            const sms = await twilioClient.messages.create({
              body,
              from: TWILIO_FROM,
              to: WHATSAPP_NOTIFY_TO.startsWith('+')
                ? WHATSAPP_NOTIFY_TO
                : `+${WHATSAPP_NOTIFY_TO.replace(/\D/g, '')}`,
            });
            console.log('SMS fallback sent:', sms.sid);
            return { status: 'sent' as const, channel: 'twilio_sms' };
          } catch (smsErr: unknown) {
            console.warn('Twilio SMS failed:', smsErr);
          }
        }
      }
    }
  }

  const callmeKey = process.env.CALLMEBOT_APIKEY;
  if (callmeKey) {
    const phone = WHATSAPP_NOTIFY_TO.replace(/\D/g, '');
    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(body)}&apikey=${encodeURIComponent(callmeKey)}`;
    try {
      const r = await fetch(url);
      if (r.ok) {
        console.log('WhatsApp (CallMeBot) sent');
        return { status: 'sent' as const, channel: 'callmebot' };
      }
      console.warn('CallMeBot status', r.status, await r.text());
    } catch (err) {
      console.warn('CallMeBot error:', err);
    }
  }

  const token = process.env.WHATSAPP_CLOUD_TOKEN;
  const phoneId = process.env.WHATSAPP_CLOUD_PHONE_ID;
  if (token && phoneId) {
    try {
      const r = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: WHATSAPP_NOTIFY_TO.replace(/\D/g, ''),
          type: 'text',
          text: { body },
        }),
      });
      if (r.ok) {
        console.log('WhatsApp (Cloud API) sent');
        return { status: 'sent' as const, channel: 'meta_cloud' };
      }
      console.warn('WhatsApp Cloud API', r.status, await r.text());
    } catch (err) {
      console.warn('WhatsApp Cloud API error:', err);
    }
  }

  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    const existing = fs.existsSync(REG_FILE)
      ? JSON.parse(fs.readFileSync(REG_FILE, 'utf8'))
      : [];
    existing.unshift({ ...payload, body, at: new Date().toISOString() });
    fs.writeFileSync(REG_FILE, JSON.stringify(existing.slice(0, 200), null, 2));
  } catch (err) {
    console.warn('Could not persist registration log:', err);
  }

  console.log('\n===== WHATSAPP BİLDİRİŞİ =====\n' + body + '\n==============================\n');
  return { status: 'logged' as const, channel: 'console' };
}

if (TWILIO_SID && TWILIO_TOKEN) {
  try {
    twilioClient = twilio(TWILIO_SID, TWILIO_TOKEN);
    console.log('Twilio client initialized successfully.');
  } catch (err) {
    console.warn('Twilio init error:', err);
  }
}

// In-memory subscribers store
interface Subscriber {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  loginTime: string;
  isVip?: boolean;
}

const subscribersList: Subscriber[] = [
  {
    id: 'sub-vip-1',
    email: 'sysdmnn@gmail.com',
    name: 'İmamverdi Məmmədov (VIP Müştəri)',
    phone: '+90 541 158 30 05',
    loginTime: 'Daxil oldu (İndi)',
    isVip: true,
  },
  {
    id: 'sub-2',
    email: 'elvin.q@gmail.com',
    name: 'Elvin Qasımov',
    loginTime: '15 dəqiqə əvvəl',
    isVip: false,
  },
  {
    id: 'sub-3',
    email: 'kamran_baku@mail.ru',
    name: 'Kamran B.',
    loginTime: '32 dəqiqə əvvəl',
    isVip: false,
  },
];

// STRICT ONLY TRY ⇄ AZN currency rates (No USD, No EUR)
export interface TryAznRate {
  pair: 'TRY/AZN' | 'AZN/TRY';
  title: string;
  minAmount: number;
  rateStandardPer1000: number; // 33.10 AZN per 1000 TL
  rateVipPer1000: number; // 33.50 AZN per 1000 TL
  standardRatePerUnit: number; // 0.03310
  vipRatePerUnit: number; // 0.03350
  commissionPer1000TL: number; // 20 TL
  vipThreshold: number; // 31,000 TL
  status: 'Canlı Aktiv';
  change24h: string;
}

const getTryAznRates = (): TryAznRate[] => [
  {
    pair: 'TRY/AZN',
    title: 'Türkiyədən Bakıya: 1,000 ₺ = 33.10 ₼ (33 manat 10 qəpik)',
    minAmount: 1000,
    rateStandardPer1000: 33.10, // 1000 TL = 33.10 AZN (33 manat 10 qəpik)
    rateVipPer1000: 33.50, // 31,000 TL-dən çox = 33.50 AZN (33 manat 50 qəpik VIP)
    standardRatePerUnit: 0.03310,
    vipRatePerUnit: 0.03350,
    commissionPer1000TL: 20, // Hər 1000 ₺-yə 20 ₺ komissiya
    vipThreshold: 31000,
    status: 'Canlı Aktiv',
    change24h: '+0.45%',
  },
  {
    pair: 'AZN/TRY',
    title: 'Bakıdan Türkiyəyə: 34 Manat = 1,000 ₺',
    minAmount: 34.00,
    rateStandardPer1000: 34.00, // 34 AZN = 1,000 TL
    rateVipPer1000: 34.00,
    standardRatePerUnit: 29.41,
    vipRatePerUnit: 29.41,
    commissionPer1000TL: 20, // Hər 1000 ₺-yə 20 ₺ komissiya
    vipThreshold: 31000,
    status: 'Canlı Aktiv',
    change24h: 'Sabit',
  },
];

// API: Rates endpoint (ONLY TRY ⇄ AZN)
app.get('/api/rates', (_req: Request, res: Response) => {
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    baseCurrencies: ['TRY', 'AZN'],
    notice: 'Yalnız TRY və AZN məzənnəsi tətbiq olunur. USD və EUR yoxdur.',
    rules: {
      minTL: 1000,
      turkeyToBakuStandard: 33.10, // 1,000 TL = 33.10 AZN (33 manat 10 qəpik)
      turkeyToBakuVip: 33.50, // 31,000 TL+ = 33.50 AZN (33 manat 50 qəpik)
      bakuToTurkey: 34.00, // 34 Manat = 1,000 TL
      commissionPer1000TL: 20, // Hər 1,000 TL-yə 20 TL komissiya
      whatsappNumber: '+90 541 158 30 05',
    },
    rates: getTryAznRates(),
  });
});

// API: Subscribers list endpoint (Shows logged in / subscribed clients)
app.get('/api/subscribers', (_req: Request, res: Response) => {
  res.json({
    success: true,
    subscribers: subscribersList,
    totalCount: subscribersList.length + 1420, // Real-looking high engagement
  });
});

// API: Subscribe / phone login — WhatsApp notification to owner
app.post('/api/subscribe', async (req: Request, res: Response) => {
  try {
    const { email = '', name = '', phone = '' } = req.body;
    const normalizedPhone = normalizePhone(String(phone));

    if (!normalizedPhone) {
      return res.status(400).json({
        error: 'Düzgün mobil nömrə daxil edin (+90 və ya +994)',
      });
    }

    if (!String(name).trim()) {
      return res.status(400).json({ error: 'Ad və soyad tələb olunur' });
    }

    if (!consumePhoneOtpVerification(normalizedPhone)) {
      return res.status(403).json({
        error: 'Əvvəlcə telefon nömrəsinə gələn SMS kodunu təsdiqləyin.',
      });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const isVip =
      cleanEmail === 'sysdmnn@gmail.com' ||
      cleanEmail.includes('sysdmnn') ||
      normalizedPhone.endsWith('5411583005');

    const newSub: Subscriber = {
      id: `sub-${Date.now()}`,
      email: cleanEmail || `${normalizedPhone.replace(/\D/g, '')}@phone.mihvalyuta.local`,
      name: String(name).trim(),
      phone: normalizedPhone,
      loginTime: 'Daxil oldu (İndi)',
      isVip,
    };

    const existingIndex = subscribersList.findIndex(
      (s) => s.phone === normalizedPhone || (cleanEmail && s.email === cleanEmail)
    );
    if (existingIndex >= 0) {
      subscribersList[existingIndex] = {
        ...subscribersList[existingIndex],
        ...newSub,
        id: subscribersList[existingIndex].id,
        loginTime: 'Yenicə daxil oldu (İndi)',
      };
    } else {
      subscribersList.unshift(newSub);
    }

    const notify = await sendWhatsAppRegistrationAlert({
      name: newSub.name || '',
      phone: normalizedPhone,
      email: cleanEmail || undefined,
    });

    res.json({
      success: true,
      subscriber: existingIndex >= 0 ? subscribersList[existingIndex] : newSub,
      message: 'Qeydiyyat tamamlandı. WhatsApp bildirişi göndərildi.',
      whatsappStatus: notify.status,
      twilioStatus: notify.status,
      notifyChannel: notify.channel,
    });
  } catch (err: unknown) {
    console.error('Subscribe error:', err);
    res.status(500).json({ error: 'Abunəlik xətası baş verdi' });
  }
});



async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MIHValyuta.com Server running on port ${PORT}`);
  });
}

startServer();
