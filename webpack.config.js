const path = require('path');

module.exports = {
  target: 'node', // Ensures Node.js built-in modules are not bundled.
  entry: './index.html', // Entry point of your application.
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory.
    filename: 'bundle.js', // Output file.
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile all .js files.
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel loader.
          options: {
            presets: ['@babel/preset-env'], // Use the env preset.
          },
        },
      },
    ],
  },
  // Additional configuration like plugins goes here.
};
