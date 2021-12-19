// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  isLocal: true,
  environment: 'localhost',
  eso_offset: 0,
  serverUrl: '',
  echUrl: '',
  reportUrl: '',
  OAuth: {
    wpclientID: '123456',
    wpcTenant: '123456',
    localLoginUrl: '设置此项可将用户重定向到自定义登录页',
    expireOffsetSeconds: 120,
    noaccess_groups: 'noaccess1;noaccess2',
    response_type: 'id_token',
    storage: {
      TOKEN_KEYS: 'thirdpart_token_keys',
      EXPIRATION_KEY: 'thirdpart_expiration_key',
      USERNAME: 'thirdpart_username',
    },
    REDIRECCT: '',
    // tslint:disable-next-line:max-line-length
    SCOPE: 'user_profile openid email profile extended_user_profile group_userprofile read_government_compliancehub write_government_compliancehub'
  },
  enableOUDOO: false,
  noaccess_groups: 'FCSG.All.Test;FCSG.All',
  apiUrl: 'http://localhost:4297/api',
  cacheUrl: '',
  hmr: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
