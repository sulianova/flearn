const { src, dest, parallel, series, watch } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

const browserSyncJob = () => {
  browserSync.init({
    server: "build/"
  });
  watch('app/scss/**/*.scss', buildSass);
  watch('app/**/*.pug', buildPug);
  watch('app/images/**/*', destImages);
  watch('app/fonts/**/*', destFonts);
};

const buildSass = () => {
  console.log('Compile SASS to CSS');

  return src('app/scss/app.scss')
    .pipe(sass())
    .pipe(dest('build/styles/'))
    .pipe(browserSync.stream());
};

const buildPug = () => {
  console.log('Compile Pug to HTML');

  return src('app/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(dest('build/'))
    .pipe(browserSync.stream());
};

const destImages = () => {
  return src('app/images/**/*')
    .pipe(dest('build/images'));
};

const destFonts = () => {
  return src('app/fonts/**/*')
    .pipe(dest('build/fonts'));
  };

const startWatch = () => {
  watch('app/**/*.pug', buildPug);
  watch('app/scss/**/*.scss', buildSass);
  watch('app/images/icons/*.svg', destImages);
  watch('app/images/*', destFonts);
};

exports.server = browserSyncJob;
exports.build = series(parallel(buildSass, buildPug, destImages, destFonts), startWatch);
