// Google
export const GOOGLE_OAUTH_TOKEN_VALIDATION_URL = 'https://www.googleapis.com/oauth2/v2/tokeninfo';
export const GOOGLE_OAUTH_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth?';
export const GOOGLE_OAUTH_ACCESS_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token';

// Nylas
export const WEBHOOK_CALLBACK_URL = 'https://fd2a3643.ngrok.io/nylas/webhook';
export const NYLAS_API_URL = 'https://api.nylas.com';

export const EMAIL_SCOPES = [
  'email.modify',
  'email.read_only',
  'email.send',
  'email.folders_and_labels',
  'email.metadata',
  'email.drafts',
];

export const MESSAGE_WEBHOOKS = ['message.created', 'message.opened', 'message.link_clicked', 'thread.replied'];

export const ACCOUNT_WEBHOOKS = [
  'account.connected',
  'account.invalid',
  'account.running',
  'account.stopped',
  'account.sync_error',
];

export const GOOGLE_SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/calendar',
  'https://www.google.com/m8/feeds/',
].join(' ');

export const ALL_WEBHOOKS = [...MESSAGE_WEBHOOKS, ...ACCOUNT_WEBHOOKS];
