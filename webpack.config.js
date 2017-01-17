module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: './public',
        filename: "bundle.js"
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "jshint-loader"
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
              test: /\.html$/,
              loader: 'html'
            }
        ]
    },
    watch: true,
    resolve: {
      alias: {
         handlebars: 'handlebars/dist/handlebars.min.js'
      }
  }
};
