import Mock from 'mockjs';
import loginAPI from './login';

Mock.setup({
  timeout: '350-600',
});

Mock.mock(/\/api\/user\/login/, 'post', loginAPI.login);
