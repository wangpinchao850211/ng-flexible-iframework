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
        noaccess_groups: 'FCSG.All.Test;FCSG.All',
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
    hmr: true
};
