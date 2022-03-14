let mix = require('laravel-mix')

// mix.browserSync('127.0.0.1:8000');

mix
  .setPublicPath('dist')
  .js('resources/js/index.js', 'js')
  // .copy([
  //     'dist/js/index.js',
  // ], './../../onboarding/public/assets/js/index.js');
  .version();
