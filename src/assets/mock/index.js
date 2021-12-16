import Mock from 'mockjs';
import loginAPI from './login';
import bookApi from './wpcbookmark';

Mock.setup({
  timeout: '350-600',
});

Mock.mock(/\/api\/user\/login/, 'post', loginAPI.login);
Mock.mock(/\/api\/wpcTechSummary\/marklist/, 'get', bookApi.list);
Mock.mock(/\/api\/wpcTechSummary\/detail/, 'get', bookApi.detail);