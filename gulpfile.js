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
  posthtmlBem = require('posthtml-bem')

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

  return gulp.src('./templates/*.php')
    .pipe(posthtml(plugins, options))
    .pipe(gulp.dest('./'))
})

gulp.task('styles', function() {
  return gulp.src('./styles/root.scss')
  .pipe(sassGlob())
  .pipe(sass({ outputStyle: 'expanded' }))
  .pipe(postcss([autoprefixer({ browsers: ['ie 11']  })]))
  .pipe(concat('style.css'))
  .pipe(gulp.dest('./'))
})

gulp.task('spritesmith', function() {
  var spriteData = gulp.src('./images/src/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: 'images/sprite.png',
    cssName: 'sprite.scss'
  }))
  spriteData.img.pipe(gulp.dest('./images/src/'))
  spriteData.css.pipe(gulp.dest('./styles/generated/'))
})

gulp.task('imagemin', function() {
  return gulp.src('./images/src/*.{gif,jpeg,jpg,png}')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 })
    ]))
    .pipe(gulp.dest('./images'))
})

gulp.task('watcher', function() {
  gulp.watch('./templates/**/*.php', ['templates'])
  gulp.watch(['./styles/*.scss', './styles/blocks/*.scss'], ['styles'])
})

gulp.task('default', function() {
  runSequence('templates', 'styles', 'watcher')
})

gulp.task('build', function() {
  runSequence('templates', 'spritesmith', 'imagemin', 'styles')
})
