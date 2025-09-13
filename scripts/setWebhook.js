// Usage:
//   export BOT_TOKEN="..." WEBHOOK_URL="https://your.app/tg-webhook" WEBHOOK_SECRET="your-secret"
//   node setWebhook.js
//
// Env vars:
//   BOT_TOKEN       (required) – your bot token from BotFather
//   WEBHOOK_URL     (required) – must be HTTPS
//   WEBHOOK_SECRET  (optional) – sent back by Telegram in X-Telegram-Bot-Api-Secret-Token
//
// Behavior:
//   drop_pending_updates is ALWAYS true

const { BOT_TOKEN, WEBHOOK_URL, WEBHOOK_SECRET } = process.env;

if (!BOT_TOKEN) {
  console.error('❌ BOT_TOKEN env var is required');
  process.exit(1);
}
if (!WEBHOOK_URL || !/^https:\/\//.test(WEBHOOK_URL)) {
  console.error('❌ WEBHOOK_URL env var must be a valid HTTPS URL');
  process.exit(1);
}

const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

(async () => {
  try {
    const _fetch =
      global.fetch || (await import('node-fetch')).then((m) => m.default);

    const body = {
      url: WEBHOOK_URL,
      drop_pending_updates: true, // static TRUE as requested
    };
    if (WEBHOOK_SECRET) body.secret_token = WEBHOOK_SECRET;

    const res = await _fetch(`${API}/setWebhook`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    if (!json.ok) {
      console.error('❌ setWebhook failed:\n', JSON.stringify(json, null, 2));
      process.exit(1);
    }

    console.log('✅ setWebhook OK');
    console.log(JSON.stringify(json.result, null, 2));
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
})();
