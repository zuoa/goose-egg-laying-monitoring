import { message } from 'antd';
import './styles/variables.css';
import './global.less';
import './styles/layout-override.css';

// 运行时配置
export const request = {
  timeout: 10000,
  errorConfig: {
    errorHandler: (error: any) => {
      message.error(error.message || '请求失败');
    },
    errorThrower: () => {},
  },
  requestInterceptors: [
    (url: string, options: any) => {
      return {
        url: `${url}`,
        options: {
          ...options,
          headers: {
            ...options.headers,
          },
        },
      };
    },
  ],
  responseInterceptors: [
    (response: any) => {
      return response;
    },
  ],
};

export const layout = () => {
  return {
    logo: require('@/assets/logo.png'),
    menu: {
      locale: false,
    },
    layout: 'top',
    headerTheme: 'light',
    navTheme: 'light',
    primaryColor: '#52c41a',
    fixedHeader: true,
    headerHeight: 48,
    token: {
      header: {
        colorBgHeader: '#52c41a',
        colorHeaderTitle: '#fff',
        colorTextMenu: '#fff',
        colorTextMenuSecondary: 'rgba(255, 255, 255, 0.75)',
        colorTextMenuSelected: '#fff',
        colorBgMenuItemHover: 'rgba(255, 255, 255, 0.15)',
        colorBgMenuItemSelected: 'rgba(255, 255, 255, 0.2)',
      },
    },
  };
}; 