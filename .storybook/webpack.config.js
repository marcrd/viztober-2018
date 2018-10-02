const config = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.yml$/,
        use: ['json-loader', 'yaml-loader'],
      },
      {
        test: /\.(jpg|png|gif|eot|ttf|woff|woff2)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          noquotes: true,
        },
      },
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      }
    ],
  },
};

module.exports = config;
