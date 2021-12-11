export default {
  // 返回的固定数据
  login: (req) => {
    console.log(req.body);
    
    let params = {};
    if (req.body) {
      // const req1 = req.body.substr(0, req.body.length - 1);
      // const reqArr = req1.split('&');
      // // 将字符串转换成数组
      // reqArr.forEach((ite) => {
      //   const k = ite.split('=')[0];
      //   const v = ite.split('=')[1];
      //   params[k] = v;
      // });
      params = {...JSON.parse(req.body)};
      console.log(params);
      const res = {
        status: 1,
        result: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InFpaHVhbi53YW5nQDEyNi5jb20iLCJhZG1pbiI6dHJ1ZSwiaXNzIjoid2FuZ3BpbmNoYW8ifQ.AjOTOXD-GOHl1n1EIYM4Jz2PpdW1zxG67_i6EytbWz0',
          user: { username: 'qihuan.wang@126.com', password: 'wqh9090QQ' },
        },
      };
      if (params.username === res.result.user.username) {
        if (params.password === res.result.user.password) {
          return res;
        } else {
          console.log('密码不正确');
          res.status = -1;
          res.result = {};
          res.code = 9002;
          return res;
        }
      } else {
        console.log('非法用户名');
        res.status = -1;
        res.result = {};
        res.code = 9001;
        return res;
      }
    }
  }
}
