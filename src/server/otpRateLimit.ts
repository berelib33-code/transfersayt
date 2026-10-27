type Bucket = {
  sendTimes: number[];
  failCount: number;
  failWindowStart: number;
  lockUntil: number;
};

const buckets = new Map<string, Bucket>();

const SEND_WINDOW_MS = 60 * 60 * 1000;
const MAX_SENDS_PER_HOUR = 4;
const MIN_SEND_INTERVAL_MS = 45 * 1000;
const MAX_FAILS = 5;
const FAIL_WINDOW_MS = 15 * 60 * 1000;
const LOCK_MS = 15 * 60 * 1000;

function bucket(key: string): Bucket {
  const existing = buckets.get(key);
  if (existing) return existing;
  const created: Bucket = {
    sendTimes: [],
    failCount: 0,
    failWindowStart: Date.now(),
    lockUntil: 0,
  };
  buckets.set(key, created);
  return created;
}

export function assertCanSendOtp(phone: string, ip: string): { ok: true } | { ok: false; error: string } {
  const now = Date.now();
  for (const key of [`p:${phone}`, `ip:${ip}`]) {
    const b = bucket(key);
    if (b.lockUntil > now) {
      return { ok: false, error: 'Çox sayda cəhd. Bir az sonra yenidən yoxlayın.' };
    }
    b.sendTimes = b.sendTimes.filter((t) => now - t < SEND_WINDOW_MS);
    const last = b.sendTimes[b.sendTimes.length - 1];
    if (last && now - last < MIN_SEND_INTERVAL_MS) {
      const wait = Math.ceil((MIN_SEND_INTERVAL_MS - (now - last)) / 1000);
      return { ok: false, error: `Yeni SMS üçün ${wait} saniyə gözləyin.` };
    }
    if (b.sendTimes.length >= MAX_SENDS_PER_HOUR) {
      return { ok: false, error: 'Bu nömrəyə SMS limiti doldu. 1 saat sonra yenidən cəhd edin.' };
    }
  }
  return { ok: true };
}

export function recordOtpSend(phone: string, ip: string) {
  const now = Date.now();
  bucket(`p:${phone}`).sendTimes.push(now);
  bucket(`ip:${ip}`).sendTimes.push(now);
}

export function assertCanCheckOtp(phone: string): { ok: true } | { ok: false; error: string } {
  const b = bucket(`p:${phone}`);
  const now = Date.now();
  if (b.lockUntil > now) {
    return { ok: false, error: 'Çox sayda səhv kod. Bir az sonra yenidən yoxlayın.' };
  }
  if (now - b.failWindowStart > FAIL_WINDOW_MS) {
    b.failCount = 0;
    b.failWindowStart = now;
  }
  return { ok: true };
}

export function recordOtpFail(phone: string) {
  const b = bucket(`p:${phone}`);
  const now = Date.now();
  if (now - b.failWindowStart > FAIL_WINDOW_MS) {
    b.failCount = 0;
    b.failWindowStart = now;
  }
  b.failCount += 1;
  if (b.failCount >= MAX_FAILS) {
    b.lockUntil = now + LOCK_MS;
  }
}

export function recordOtpSuccess(phone: string) {
  const b = bucket(`p:${phone}`);
  b.failCount = 0;
  b.lockUntil = 0;
}

export function otpResendCooldownSec(phone: string): number {
  const b = buckets.get(`p:${phone}`);
  if (!b || b.sendTimes.length === 0) return 0;
  const last = b.sendTimes[b.sendTimes.length - 1];
  const remain = MIN_SEND_INTERVAL_MS - (Date.now() - last);
  return remain > 0 ? Math.ceil(remain / 1000) : 0;
}
