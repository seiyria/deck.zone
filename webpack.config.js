
module.exports = {
  loaders: [
    {
      test: /\.worker.js$/,
      loaders: ['worker-loader'],
      exclude: /node_modules/
    }
  ]
};