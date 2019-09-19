import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
import * as Nylas from 'nylas';
import { debugNylas } from '../debuggers';
import { getEnv } from '../utils';
import {
  GOOGLE_OAUTH_ACCESS_TOKEN_URL,
  GOOGLE_OAUTH_AUTH_URL,
  GOOGLE_SCOPES,
  MICROSOFT_OAUTH_ACCESS_TOKEN_URL,
  MICROSOFT_OAUTH_AUTH_URL,
  MICROSOFT_SCOPES,
} from './constants';

// load config
dotenv.config();

const { NYLAS_CLIENT_SECRET } = process.env;

/**
 * Verify request by nylas signature
 * @param {Request} req
 * @returns {Boolean} verified request state
 */
const verifyNylasSignature = req => {
  const hmac = crypto.createHmac('sha256', NYLAS_CLIENT_SECRET);
  const digest = hmac.update(req.rawBody).digest('hex');

  return digest === req.get('x-nylas-signature');
};

/**
 * Check nylas credentials
 * @returns void
 */
const checkCredentials = () => {
  return Nylas.clientCredentials();
};

/**
 * Get client id and secret
 * for selected provider
 * @returns void
 */
const getClientConfig = (kind: string): string[] => {
  const providers = {
    gmail: [getEnv({ name: 'GOOGLE_CLIENT_ID' }), getEnv({ name: 'GOOGLE_CLIENT_SECRET' })],
    outlook: [getEnv({ name: 'MICROSOFT_CLIENT_ID' }), getEnv({ name: 'MICROSOFT_CLIENT_SECRET' })],
  };

  return providers[kind];
};

/**
 * Get provider specific values
 * @param {String} kind
 * @returns {Object} configs
 */
const getProviderSettings = (kind: string) => {
  const gmail = {
    params: {
      access_type: 'offline',
      scope: GOOGLE_SCOPES,
    },
    urls: {
      authUrl: GOOGLE_OAUTH_AUTH_URL,
      tokenUrl: GOOGLE_OAUTH_ACCESS_TOKEN_URL,
    },
  };

  const outlook = {
    params: {
      scope: MICROSOFT_SCOPES,
    },
    urls: {
      authUrl: MICROSOFT_OAUTH_AUTH_URL,
      tokenUrl: MICROSOFT_OAUTH_ACCESS_TOKEN_URL,
    },
    requestParams: {
      headerType: 'application/x-www-form-urlencoded',
      dataType: 'form-url-encoded',
    },
  };

  const providers = { gmail, outlook };

  return providers[kind];
};

/**
 * Request to Nylas SDK
 * @param {String} - accessToken
 * @param {String} - parent
 * @param {String} - child
 * @param {String} - filter
 * @returns {Promise} - nylas response
 */
const nylasRequest = args => {
  const {
    parent,
    child,
    accessToken,
    filter,
  }: {
    parent: string;
    child: string;
    accessToken: string;
    filter?: any;
  } = args;

  if (!checkCredentials()) {
    return debugNylas('Nylas is not configured');
  }

  if (!accessToken) {
    return debugNylas('Access token not found');
  }

  const nylas = Nylas.with(accessToken);

  return nylas[parent][child](filter)
    .then(response => debugNylas(response))
    .catch(e => debugNylas(e.message));
};

export { getProviderSettings, getClientConfig, nylasRequest, checkCredentials, verifyNylasSignature };