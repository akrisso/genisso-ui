export enum ConfigKeys {
  ADMIN_AUTH_URL = 'ADMIN_AUTH_URL',
  ADMIN_URL = 'ADMIN_URL',
  AUTH_URL = 'AUTH_URL',
  ORGANIZATION_URL = 'ORGANIZATION_URL',
}

export const config: Record<ConfigKeys, string> = {
  [ConfigKeys.ADMIN_AUTH_URL]: '/api/v1/super-admin/login',
  [ConfigKeys.ADMIN_URL]: '/api/v1/super-admin',
  [ConfigKeys.AUTH_URL]: '/api/v1/auth',
  [ConfigKeys.ORGANIZATION_URL]: '/api/v1/organizations',
};

