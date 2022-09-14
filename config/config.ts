// import { IConfig } from 'umi-types';
import pageRoutes from './router'

const config = {
  antd: {
  },
  dva: {},
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  title: 'H5 Door',
  dll: false,
  hardSource: false,
  routes: pageRoutes,
  ignoreMomentLocale: true,
  hash: true,
  publicPath: '/',
  theme: {
    'disabled-color': '#575757',
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      { libraryName: 'antd', libraryDirectory: 'lib', style: true },
    ],
    [
      'babel-plugin-import',
      { libraryName: '@formily/antd', libraryDirectory: 'lib', style: true },
      'formilyAntd',
    ],
    [
      'babel-plugin-import',
      { libraryName: 'antd-mobile', libraryDirectory: 'es/components', style: false },
      'antd-mobile',
    ]
  ],

  // 只需要 dev，这么配
  mfsu: {},
  /*
   * 如果需要针对生产环境生效，这么配
   * mfsu: { production: { output: '.mfsu-production' } },
   */
  proxy: {
    '/api': {
      target: 'https://test-newboss.otosaas.com',
      changeOrigin: true,
      /*
       * pathRewrite: {// 如果接口本身没有/api需要通过pathRewrite来重写了地址
       *   '^/api': '/'
       * }
       */
    },
  },
  // saas:{}
}

export default config
