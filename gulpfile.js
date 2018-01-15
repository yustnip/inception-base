const gulp = require('gulp'),
  spritesmith = require('gulp.spritesmith'),
  imagemin = require('gulp-imagemin'),
  postcss = require('gulp-postcss'),
  concat = require('gulp-concat'),
  runSequence = require('run-sequence'),
  sass = require('gulp-sass'),
  sassGlob = require('gulp-sass-glob'),
  autoprefixer = require('autoprefixer'),
  posthtml = require('gulp-posthtml'),
  posthtmlBem = require('posthtml-bem'),
  rename = require('gulp-rename'),
  buffer = require('vinyl-buffer'),
  webpack = require('webpack-stream'),
  del = require('del'),
  cleanCSS = require('gulp-clean-css'),
  cache = require('gulp-cache')

gulp.task('templates', () => {
  const bemConfig = {
    elemPrefix: '__',
    modPrefix: '_',
    modDlmtr: '--'
  }
  const plugins = [posthtmlBem(bemConfig)]
  const options = {
    directives: [
      { name: '?php', start: '<', end: '>' }
    ]
  }

  return gulp.src('./src/templates/**/*.php')
    .pipe(posthtml(plugins, options))
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest('./'))
})

gulp.task('styles', () => {
  return gulp.src('./src/styles/index.scss')
  .pipe(sassGlob())
  .pipe(sass({ outputStyle: 'expanded' }))
  .pipe(postcss([autoprefixer({ browsers: ['ie 11']  })]))
  .pipe(concat('style.css'))
  .pipe(gulp.dest('./'))
})

gulp.task('minify-css', () => {
  return gulp.src('./style.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./'))
})

gulp.task('scripts-dev', () => {
  return gulp.src('./src/scripts/index.js')
    .pipe(webpack( require('./webpack/webpack-dev.config.js') ))
    .pipe(gulp.dest('./'))
})

gulp.task('scripts-prod', () => {
  return gulp.src('./src/scripts/index.js')
    .pipe(webpack( require('./webpack/webpack-prod.config.js') ))
    .pipe(gulp.dest('./'))
})

gulp.task('clean', () => {
  return del([
    './images/**',
    './scripts.js.map'
  ])
})

gulp.task('spritesmith', () => {
  const spriteData = gulp.src('./src/images/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: 'images/sprite.png',
    cssName: 'sprite.scss'
  }))
  spriteData.img
    .pipe(buffer())
    .pipe(imagemin([imagemin.optipng({ optimizationLevel: 5 })]))
    .pipe(gulp.dest('./images'))

  spriteData.css.pipe(gulp.dest('./src/styles/generated'))
})

gulp.task('imagemin-dev', () => {
  return gulp.src('./src/images/*.{gif,jpeg,jpg,png}')
    .pipe(cache(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 })
    ])))
    .pipe(gulp.dest('./images'))
})

gulp.task('imagemin-prod', () => {
  return gulp.src('./src/images/*.{gif,jpeg,jpg,png}')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 })
    ]))
    .pipe(gulp.dest('./images'))
})

gulp.task('copy', () => {
  return gulp.src(['./src/images/*.svg'])
    .pipe(gulp.dest('./images'))
})

gulp.task('watcher', () => {
  gulp.watch('./src/templates/**/*.php', ['templates'])
  gulp.watch(['./src/styles/*.scss', './src/styles/blocks/*.scss'], ['styles'])
  gulp.watch('./src/scripts/**/*.js', ['scripts-dev'])
})

gulp.task('default', () => {
  runSequence(
    'templates',
    'styles',
    'scripts-dev',
    'spritesmith',
    'imagemin-dev',
    'copy',
    'watcher'
  )
})

gulp.task('prod', () => {
  runSequence(
    'clean',
    'templates',
    'styles',
    'scripts-prod',
    'spritesmith',
    'imagemin-prod',
    'minify-css',
    'copy'
  )
})
