var gulp = require('gulp'),
    pug = require('gulp-pug'),
    rename = require('gulp-rename'),
    prettify = require('gulp-jsbeautifier'),
    spritesmith = require('gulp.spritesmith'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    postcss = require('gulp-postcss'),
    cssnext = require('postcss-cssnext'),
    concat = require('gulp-concat');
    

gulp.task('pug', function() {
    gulp.src('./pug/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(prettify({
            indent_size: 4,
            indent_char: ' '
        }))
        .on('error', function( err ) { console.error( err ) }) // Выводим ошибки в консоль
        .pipe(rename({
            extname: '.php'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('styles', function() {
    var processors = [
        cssnext({
            browsers: 'last 3 versions'
        })
    ];
    
    gulp.src(['./styles/style.css', './styles/*.css'])
        .pipe(postcss(processors))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./'));
});

gulp.task('spritesmith', function() {
    var spriteData = gulp.src('./images/src/sprite/*.*').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    }));
    spriteData.img.pipe(gulp.dest('./images/src/'));
    spriteData.css.pipe(gulp.dest('./styles/generated/'));
});

gulp.task('imagemin', function() {
    gulp.src('./images/src/*.*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./images'));
});

gulp.task( 'default', ['pug', 'styles', 'spritesmith', 'imagemin'] );
gulp.task( 'dev-light', ['pug', 'styles'] );

// gulp.watch('./pug/*.pug', ['pug']);
// gulp.watch('./styles/*.css', ['styles']);
