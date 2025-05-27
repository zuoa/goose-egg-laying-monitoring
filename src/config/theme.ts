/**
 * 农业数字化应用主题配置
 */

export const theme = {
  // 主色调 - 清新绿色
  primaryColor: '#52c41a',
  primaryColorHover: '#73d13d',
  primaryColorActive: '#389e0d',
  
  // 主色调色阶
  primaryColors: {
    1: '#f6ffed',
    2: '#d9f7be',
    3: '#b7eb8f',
    4: '#95de64',
    5: '#73d13d',
    6: '#52c41a',
    7: '#389e0d',
    8: '#237804',
    9: '#135200',
    10: '#092b00',
  },
  
  // 功能色
  successColor: '#52c41a',
  warningColor: '#faad14',
  errorColor: '#f5222d',
  infoColor: '#1890ff',
  
  // 中性色
  textColor: 'rgba(0, 0, 0, 0.85)',
  textColorSecondary: 'rgba(0, 0, 0, 0.45)',
  textColorTertiary: 'rgba(0, 0, 0, 0.25)',
  borderColorBase: '#d9d9d9',
  backgroundColorBase: '#f5f5f5',
  
  // 农业相关的特殊颜色
  agriculture: {
    grassGreen: '#7cb305',
    leafGreen: '#5b8c00',
    soilBrown: '#873800',
    skyBlue: '#87ceeb',
    sunYellow: '#fadb14',
    waterBlue: '#13c2c2',
  },
  
  // 布局相关
  layout: {
    headerBackground: '#ffffff',
    siderBackground: '#001529',
    bodyBackground: '#f0f2f5',
  },
  
  // 阴影
  boxShadow: {
    base: '0 2px 8px rgba(0, 0, 0, 0.09)',
    card: '0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)',
    hover: '0 4px 12px rgba(82, 196, 26, 0.15)',
  },
};

// 图表配色方案
export const chartColors = [
  '#52c41a',
  '#73d13d',
  '#95de64',
  '#b7eb8f',
  '#d9f7be',
  '#f6ffed',
  '#7cb305',
  '#5b8c00',
  '#389e0d',
  '#237804',
];

// Ant Design 主题配置
export const antdTheme = {
  token: {
    colorPrimary: theme.primaryColor,
    colorLink: theme.primaryColor,
    colorSuccess: theme.successColor,
    colorWarning: theme.warningColor,
    colorError: theme.errorColor,
    colorInfo: theme.infoColor,
    colorTextBase: theme.textColor,
    colorBgBase: '#ffffff',
    borderRadius: 6,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
}; 