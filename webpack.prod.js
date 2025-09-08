const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    filename: '[name].[contenthash].js',
    publicPath: './'
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'bundle-stats.json',
      defaultSizes: 'gzip'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: ['...', new CssMinimizerPlugin()],
    // splitChunks: {
    //   chunks: 'all',
    //   minSize: 20000,
    //   maxSize: 244000,
    //   cacheGroups: {
    //     // React 관련 라이브러리를 별도 청크로 분리 (캐시 효율성)
    //     react: {
    //       test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
    //       name: 'react',
    //       priority: 20,
    //       chunks: 'all',
    //       reuseExistingChunk: true
    //     },
    //     icons: {
    //       test: /[\\/]node_modules[\\/]react-icons[\\/]/,
    //       name: 'icons',
    //       priority: 15,
    //       chunks: 'all',
    //       reuseExistingChunk: true,
    //       minChunks: 1,
    //       maxSize: 50000
    //     },
    //     // 기타 vendor 라이브러리 (작은 청크로 분할)
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendors',
    //       priority: 10,
    //       chunks: 'all',
    //       reuseExistingChunk: true,
    //       minChunks: 1,
    //       maxSize: 200000
    //     },
    //     // 공통으로 사용되는 애플리케이션 코드
    //     common: {
    //       name: 'common',
    //       minChunks: 2,
    //       priority: 5,
    //       chunks: 'all',
    //       reuseExistingChunk: true,
    //       maxSize: 100000
    //     },
    //     // 기본 청크 (작은 크기로 제한)
    //     default: {
    //       minChunks: 2,
    //       priority: -10,
    //       reuseExistingChunk: true,
    //       maxSize: 100000
    //     }
    //   }
    // },
    usedExports: true,
    sideEffects: false,
    innerGraph: true,
    concatenateModules: true,
    providedExports: true,
    mangleExports: 'size'
  }
});
