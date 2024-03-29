const menulist = [
    {
        "id": "A001",
        "name": "html5",
        "rating": "3.4",
        "desc": "h5标签,音频,视频,表格,表单,图表",
        "categories": ["web基础", "布局基础"]
    },
    {
        "id": "E002",
        "name": "Sass/Scss",
        "rating": "3.9",
        "desc": "Css预编译语言，scss使用技巧",
        "categories": ["css高级", "scss"]
    },
    {
        "id": "A002",
        "name": "css3",
        "rating": "3.5",
        "desc": "盒模型,选择器,继承,动画",
        "categories": ["web基础", "布局基础"]
    },
    {
        "id": "A003",
        "name": "JS高级",
        "rating": "4.2",
        "desc": "JS设计模式，基础处理函数，常用方法, ES-X",
        "categories": ["web基础", "dom操作基础", "bom操作基础"]
    },
    {
        "id": "C001",
        "name": "angular",
        "rating": "3.9",
        "desc": "angular框架特点",
        "categories": ["JS高级", "web框架升级优化"]
    },
    {
        "id": "B001",
        "name": "http",
        "rating": "3.5",
        "desc": "web前后台链接基础，http参数汇总，ajax封装",
        "categories": ["web基础", "http基础", "webSocket"]
    },
    {
        "id": "D001",
        "name": "typescript",
        "rating": "3.9",
        "desc": "typescript语言特点，typescript使用技巧",
        "categories": ["JS高级", "typescript编译原理"]
    },
    {
        "id": "B002",
        "name": "git",
        "rating": "3.2",
        "desc": "项目code管理常用命令，github网址使用",
        "categories": ["项目管理", "node/npm命令"]
    },
    {
        "id": "E003",
        "name": "Echart",
        "rating": "3.6",
        "desc": "echart使用技巧",
        "categories": ["css高级", "scss"]
    },
    {
        "id": "B003",
        "name": "浏览器",
        "rating": "4.0",
        "desc": "chrome调试技巧，ie调试技巧",
        "categories": ["web基础", "bom操作", "浏览器兼容性研究"]
    },
    {
        "id": "B004",
        "name": "vs-code",
        "rating": "3.3",
        "desc": "vs-code使用指南",
        "categories": ["web基础", "code调试使用"]
    },
    {
        "id": "C002",
        "name": "react",
        "rating": "3.9",
        "desc": "react框架特点",
        "categories": ["JS高级", "web框架升级优化"]
    },
    {
        "id": "C003",
        "name": "Vue",
        "rating": "3.9",
        "desc": "Vue框架特点",
        "categories": ["JS高级", "web框架升级优化"]
    },
    {
        "id": "D002",
        "name": "webpack",
        "rating": "3.9",
        "desc": "webpack基础，webpack打包编译原理",
        "categories": ["JS高级", "webpack编译原理"]
    },
    {
        "id": "E001",
        "name": "jQuery",
        "rating": "3.9",
        "desc": "jQuery使用技巧",
        "categories": ["css高级", "dom操作"]
    },
    {
        "id": "E004",
        "name": "Canvas",
        "rating": "3.6",
        "desc": "Canvas使用技巧",
        "categories": ["css高级", "css动画"]
    },
    {
        "id": "E005",
        "name": "WebGL",
        "rating": "3.6",
        "desc": "Three.js使用技巧,WebGL应用",
        "categories": ["css高级", "3d动画"]
    }
];
export default {
    list: (req) => {
      console.log(req);
      if (req.url.includes('marklist')) {
        const res = {
            status: 1,
            result: {
              token: 'token',
              data: menulist,
            },
            message: '请求成功'
        };
        return res;
      }
      return {
            status: 0,
            result: {
                token: 'token',
                data: [],
            },
            message: '请求失败'
      };
    },
    detail: (req) => {
      console.log(req);
      const ID = req.url.replace('http://localhost:4297/api/wpcTechSummary/detail', '');
      const detailResult = menulist.filter(i => i.id === ID);
      if (req.url.includes('detail')) {
        const res = {
            status: 1,
            result: {
              token: 'token',
              data: detailResult,
            },
            message: '请求成功'
        };
        return res;
      }
      return {
            status: 0,
            result: {
                token: 'token',
                data: [],
            },
            message: '请求失败'
      };
    }
}