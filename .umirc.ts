import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    theme: {
      token: {
        // 主色调 - 使用清新的绿色
        colorPrimary: '#52c41a',
        // 链接色
        colorLink: '#52c41a',
        // 成功色
        colorSuccess: '#52c41a',
        // 边框圆角
        borderRadius: 6,
        // 字体
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
    },
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '种鹅产蛋性状全过程监测系统',
    locale: false,
    layout: 'top',
    theme: 'light',
    // 配置主题色
    siderMenuType: 'group',
    navTheme: 'light',
    primaryColor: '#52c41a',
    contentWidth: 'Fluid',
    fixedHeader: true,
    // 配置头部主题
    headerTheme: 'light',
    // 配置头部样式
    headerHeight: 48,
    // 配置头部背景色
    token: {
      bgLayout: '#52c41a',
      colorTextAppListIcon: '#fff',
      colorTextAppListIconHover: '#fff',
      header: {
        colorBgHeader: '#52c41a',
        colorHeaderTitle: '#fff',
        colorTextMenu: '#fff',
        colorTextMenuSecondary: 'rgba(255, 255, 255, 0.75)',
        colorTextMenuSelected: '#fff',
        colorBgMenuItemHover: 'rgba(255, 255, 255, 0.15)',
        colorBgMenuItemSelected: 'rgba(255, 255, 255, 0.2)',
        colorTextRightActionsItem: '#fff',
      },
    },
  },
  styles: ['@/global.less'],
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      name: '数据看板',
      path: '/dashboard',
      component: './Dashboard',
      icon: 'DashboardOutlined',
    },
    {
      name: '种鹅档案',
    path: '/goose/list',
    component: './Goose/List',
      icon: 'TeamOutlined',

    },
    {
        name: '鹅只详情',
        path: '/goose/detail/:id',
        component: './Goose/Detail',
        hideInMenu: true,
      },
    {
      name: '产蛋箱管理',
      path: '/nestbox/list',
      component: './NestBox/List',
      icon: 'HomeOutlined',
    },
    {
      name: '产蛋箱详情',
      path: '/nestbox/detail/:id',
      component: './NestBox/Detail',
      hideInMenu: true,
    },
  ],
  npmClient: 'npm',
  // 暂时注释掉 openAPI 配置，等需要对接后端时再启用
  // plugins: [
  //   '@umijs/max-plugin-openapi',
  // ],
  // openAPI: [
  //   {
  //     requestLibPath: "import { request } from '@umijs/max'",
  //     schemaPath: 'http://localhost:8080/api/v3/api-docs',
  //     projectName: 'goose-api',
  //   },
  // ],
}); 