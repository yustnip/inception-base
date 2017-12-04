var gulp = require('gulp'),
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
  webpack = require('webpack-stream')

gulp.task('templates', function() {
  var bemConfig = {
    elemPrefix: '__',
    modPrefix: '_',
    modDlmtr: '--'
  }
  var plugins = [posthtmlBem(bemConfig)]
  var options = {
    directives: [
      { name: '?php', start: '<', end: '>' }
    ]
  }

  return gulp.src('./src/templates/**/*.php')
    .pipe(posthtml(plugins, options))
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest('./'))
})

gulp.task('styles', function() {
  return gulp.src('./src/styles/index.scss')
  .pipe(sassGlob())
  .pipe(sass({ outputStyle: 'expanded' }))
  .pipe(postcss([autoprefixer({ browsers: ['ie 11']  })]))
  .pipe(concat('style.css'))
  .pipe(gulp.dest('./'))
})

gulp.task('scripts', function() {
  return gulp.src('./src/scripts/index.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('./'))
})

gulp.task('spritesmith', function() {
  var spriteData = gulp.src('./src/images/sprite/*.png').pipe(spritesmith({
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

gulp.task('imagemin', function() {
  return gulp.src('./src/images/*.{gif,jpeg,jpg,png}')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 })
    ]))
    .pipe(gulp.dest('./images'))
})

gulp.task('watcher', function() {
  gulp.watch('./src/templates/**/*.php', ['templates'])
  gulp.watch(['./src/styles/*.scss', './src/styles/blocks/*.scss'], ['styles'])
  gulp.watch('./src/scripts/**/*.js', ['scripts'])
})

gulp.task('default', function() {
  runSequence('templates', 'styles', 'scripts', 'watcher')
})

gulp.task('build', function() {
  runSequence('templates', 'scripts', 'spritesmith', 'imagemin', 'styles')
})
