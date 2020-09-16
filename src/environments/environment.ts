import { Config } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'GameLending',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44356',
    redirectUri: baseUrl,
    clientId: 'GameLending_App',
    responseType: 'code',
    scope: 'offline_access GameLending',
  },
  apis: {
    default: {
      url: 'https://localhost:44311',
      rootNamespace: 'GameLending',
    },
  },
} as Config.Environment;
