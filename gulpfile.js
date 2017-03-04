var gulp = require( 'gulp' ),
    pug = require( 'gulp-pug' ),
    rename = require( 'gulp-rename' ),
    prettify = require( 'gulp-jsbeautifier' ),
    spritesmith = require( 'gulp.spritesmith' ),
    imagemin = require( 'gulp-imagemin' ),
    pngquant = require( 'imagemin-pngquant' ),
    postcss = require( 'gulp-postcss' ),
    cssnext = require( 'postcss-cssnext' ),
    concat = require( 'gulp-concat' )

gulp.task( 'pug', function() {
    return gulp.src( './pug/*.pug' )
        .pipe( pug() )
        .pipe( prettify( {
            indent_size: 4,
            indent_char: ' '
        } ) )
        .on( 'error', function( err ) { console.error( err ) } )
        .pipe( rename( {
            extname: '.php'
        } ) )
        .pipe( gulp.dest('./') )
} )

gulp.task( 'styles', function() {
    var processors = [
        cssnext( {
            browsers: 'last 3 versions'
        } )
    ]

    return gulp.src( [ './styles/*.css', './styles/blocks/*.css' ] )
        .pipe( postcss( processors ) )
        .pipe( concat( 'style.css' ) )
        .pipe( gulp.dest( './' ) )
} )

gulp.task( 'spritesmith', function() {
    var spriteData = gulp.src( './images/src/sprite/*.*' ).pipe( spritesmith( {
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    } ) )
    spriteData.img.pipe( gulp.dest( './images/src/' ) )
    spriteData.css.pipe( gulp.dest( './styles/generated/' ) )
} )

gulp.task( 'imagemin', function() {
    return gulp.src( './images/src/*.*' )
        .pipe( imagemin( {
            progressive: true,
            use: [ pngquant() ]
        } ) )
        .pipe( gulp.dest('./images') )
} )

gulp.task( 'watcher', function() {
    gulp.watch( './pug/*.pug', [ 'pug' ] )
    gulp.watch( [ './styles/*.css', './styles/blocks/*.css' ], [ 'styles' ] )
} )

gulp.task( 'default', [ 'pug', 'styles', 'spritesmith', 'imagemin', 'watcher' ] )
gulp.task( 'dev:light', [ 'pug', 'styles'] )
