import webpack = require("webpack");
const WebpackDevServer = require('webpack-dev-server');

var friendlySyntaxErrorLabel = 'Syntax error:';

function isLikelyASyntaxError(message) {
  return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}

function formatMessage(message) {
  return message
  // Make some common errors shorter:
    .replace(
      // Babel syntax error
      'Module build failed: SyntaxError:',
      friendlySyntaxErrorLabel
    )
    .replace(
      // Webpack file not found error
      /Module not found: Error: Cannot resolve 'file' or 'directory'/,
      'Module not found:'
    )
    // Internal stacks are generally useless so we strip them
    .replace(/^\s*at\s.*:\d+:\d+[\s\)]*\n/gm, '') // at ... ...:x:y
    // Webpack loader names obscure CSS filenames
    .replace('./~/css-loader!./~/postcss-loader!', '');
}

export function runFrontendAndWatch({
  indexHtml,
  favIcon,
  name,
  script,
  rootUrl = 'http://localhost'
}) {
  const config = require('../../assets/frontend.dev.webpack.config')(indexHtml, favIcon, name, script, rootUrl);

  var compiler = webpack(config);

  compiler['plugin']('invalid', function () {
    console.log('Compiling...');
  });

  compiler['plugin']('done', function (stats) {
    var hasErrors = stats.hasErrors();
    var hasWarnings = stats.hasWarnings();
    if (!hasErrors && !hasWarnings) {
      console.log('Compiled successfully!');
      console.log();
      console.log(`The app is running at http://localhost:3000/`);
      console.log();
      return;
    }

    var json = stats.toJson();
    var formattedErrors = json.errors.map(message =>
      'Error in ' + formatMessage(message)
    );
    var formattedWarnings = json.warnings.map(message =>
      'Warning in ' + formatMessage(message)
    );

    if (hasErrors) {
      console.log('Failed to compile.');
      console.log();
      if (formattedErrors.some(isLikelyASyntaxError)) {
        // If there are any syntax errors, show just them.
        // This prevents a confusing ESLint parsing error
        // preceding a much more useful Babel syntax error.
        formattedErrors = formattedErrors.filter(isLikelyASyntaxError);
      }
      formattedErrors.forEach(message => {
        console.log(message);
        console.log();
      });
      // If errors exist, ignore warnings.
      return;
    }

    if (hasWarnings) {
      console.log('Compiled with warnings.');
      console.log();
      formattedWarnings.forEach(message => {
        console.log(message);
        console.log();
      });
    }
  });

  new WebpackDevServer(compiler, {
    historyApiFallback: true,
    hot: true, // Note: only CSS is currently hot reloaded
    publicPath: config.output.publicPath,
    quiet: true
  }).listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      return console.log(err);
    }

    console.log('Starting the development server...');
    console.log();
  });

}