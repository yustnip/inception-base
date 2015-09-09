var gulp = require('gulp'),
    jade = require('gulp-jade'),
    rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
    prettify = require('gulp-jsbeautifier'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer-core'),
    stylint = require('gulp-stylint'),
    spritesmith = require('gulp.spritesmith'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');


gulp.task('jade', function(){
	gulp.src('./jade/*.jade')
		.pipe(jade({ pretty: true }))
        .pipe(prettify({
            indent_size: 1,
            indent_char: '\t',
            indent_inner_html: true
        }))
		.on('error', console.log) // Выводим ошибки в консоль
        .pipe(rename({ //Изменяем расширение на .php
            extname: '.php'
        }))
		.pipe(gulp.dest('./'));
});

gulp.task('stylus', function() {
    gulp.src('./styl/*.styl')
    	.pipe(stylus())
        .pipe(postcss([ autoprefixer({ browsers: [ 'last 10 versions', 'ie 9' ] }) ]))
	    .on('error', console.log) // Выводим ошибки в консоль
	    .pipe(gulp.dest( './') );
});

gulp.task('stylint', function() {
    gulp.src('./styl/*.styl')
        .pipe(stylint({
            rules: {
                'cssLiteral': 'never',
                'colons': 'never',
                'commaSpace': 'always',
                'commentSpace': 'always',
                'duplicates': true,
                'efficient': 'always',
                'leadingZero': 'never',
                'semicolons': 'never',
                'valid': true,
                'zeroUnits': 'never',
                'sortOrder': [
                    'position',
                    'top',
                    'right',
                    'bottom',
                    'left',
                    'z-index',
                    'margin',
                    'margin-top',
                    'margin-right',
                    'margin-bottom',
                    'margin-left',
                    'padding',
                    'padding-top',
                    'padding-right',
                    'padding-bottom',
                    'padding-left',
                    'box-sizing',
                    'width',
                    'max-width',
                    'min-width',
                    'height',
                    'min-height',
                    'max-height',
                    'overflow',
                    'float',
                    'display',
                    'font',
                    'font-style',
                    'font-weight',
                    'font-size',
                    'font-family'
                ]
            }
        }));
});

gulp.task('spritesmith', function() {
    var spriteData = gulp.src('./images/src/sprite/*.*').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.styl',
        cssFormat: 'stylus'
    }));
    spriteData.img.pipe(gulp.dest('./images/src/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./styl/helpers/')); // путь, куда сохраняем стили
});

gulp.task('imagemin', function() {
    gulp.src('./images/src/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./images'));
});

gulp.task( 'default', ['jade', 'stylus', 'stylint', 'spritesmith', 'imagemin'] );
//gulp.task( 'default', ['jade', 'stylus', 'stylint'] );
