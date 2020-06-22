const HtmlWebPackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: loaderContext => {
                const { rootContext } = loaderContext;
                const varsPath = path.resolve(
                  rootContext,
                  'src/_variables.scss'
                );
                return `@import '${varsPath}';`;
              },
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin(),
  ],
};
