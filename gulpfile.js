const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const fileInclude = require('gulp-file-include');
const { series, parallel, watch } = require('gulp');
const { src, dest } = gulp;
const gsap = require('gsap');
const rollup = require('rollup');
const resolve = require('@rollup/plugin-node-resolve');
const browserSync = require('browser-sync').create();

// Compile SCSS to CSS
function compileSass() {
  return src('src/scss/styles.scss')
    .pipe(sass())
    .pipe(dest('dist/css'));
}

function copyJs() {
  return src('src/js/*.js')
    .pipe(dest('dist/js'));
}

function initBrowserSync() {
  browserSync.init({
    server: {
      baseDir: 'dist', // Serve files from the 'dist' directory
    },
  });
}

async function bundleJs() {
  const bundle = await rollup.rollup({
    input: 'src/js/main.js',
    plugins: [resolve()],
  });

  await bundle.write({
    file: 'dist/js/main.js',
    format: 'es',
  });
}

function watchFiles() {
  watch('src/scss/**/*.scss', compileSass);
  watch('src/index.html', fileInclude);
  watch('src/components/**/*.html', fileInclude);
  watch('src/js/**/*.js', bundleJs);
  watch('dist/**/*').on('change', browserSync.reload); // Reload when files change
}

function includeHtmlComponents() {
  return src('src/*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('dist'));
}

function copyImages() { 
  return src('src/media/**/*')
    .pipe(dest('dist/media'));
}

// Default task
exports.default = series(
  parallel(compileSass, includeHtmlComponents, bundleJs, copyImages),
  parallel(initBrowserSync, watchFiles)
);
