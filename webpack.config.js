
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker.js$/,
        loaders: ['worker-loader'],
        exclude: /node_modules/
      }
    ]
  }
};