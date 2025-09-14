// Fetches Telegram getWebhookInfo and prints it.
//
// Usage:
//   node getWebhookInfo.js
//
// Requires in .env (at project root):
//   BOT_TOKEN=123456:ABC...
//
// This script auto-loads ../.env (root) or ./.env

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// Load .env from project root (../.env when script is in scripts/)
try {
  const rootEnv = path.resolve(__dirname, '../.env');
  const cwdEnv = path.resolve(process.cwd(), '.env');
  const envPath = fs.existsSync(rootEnv)
    ? rootEnv
    : fs.existsSync(cwdEnv)
      ? cwdEnv
      : null;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  if (envPath) require('dotenv').config({ path: envPath });
} catch (_) {}

const { BOT_TOKEN } = process.env;
if (!BOT_TOKEN) {
  console.error('❌ BOT_TOKEN env var is required');
  process.exit(1);
}

const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

(async () => {
  try {
    const _fetch =
      global.fetch || (await import('node-fetch')).then((m) => m.default);
    const res = await _fetch(`${API}/getWebhookInfo`, { method: 'GET' });
    const json = await res.json();

    if (!json.ok) {
      console.error(
        '❌ getWebhookInfo failed:\n',
        JSON.stringify(json, null, 2),
      );
      process.exit(1);
    }

    console.log(JSON.stringify(json.result, null, 2));
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
})();
