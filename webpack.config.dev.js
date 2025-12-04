//const { merge } = require('webpack-merge');
//const common = require('./webpack.common.js');

module.exports = /*merge(common, */{
  entry: {
    app: '/public_html/index.js'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    liveReload: true,
    hot: true,
    open: false,
    static: ['./public_html/'],
  },
}//);
