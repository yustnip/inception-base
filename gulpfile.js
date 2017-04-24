var gulp = require( 'gulp' ),
    pug = require( 'gulp-pug' ),
    rename = require( 'gulp-rename' ),
    prettify = require( 'gulp-jsbeautifier' ),
    spritesmith = require( 'gulp.spritesmith' ),
    imagemin = require( 'gulp-imagemin' ),
    postcss = require( 'gulp-postcss' ),
    cssnext = require( 'postcss-cssnext' ),
    concat = require( 'gulp-concat' ),
    runSequence = require( 'run-sequence' ),
    atImport = require( 'postcss-import' )

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
        atImport(),
        cssnext( {
            browsers: 'last 3 versions'
        } )
    ]

    return gulp.src( [
        './styles/*.css',
        './styles/blocks/*.css',
        './styles/generated/*.css'
        ] )
        .pipe( postcss( processors ) )
        .pipe( concat( 'style.css' ) )
        .pipe( gulp.dest( './' ) )
} )

gulp.task( 'spritesmith', function() {
    var spriteData = gulp.src( './images/src/sprite/*.png' ).pipe( spritesmith( {
        imgName: 'sprite.png',
        imgPath: 'images/sprite.png',
        cssName: 'sprite.css'
    } ) )
    spriteData.img.pipe( gulp.dest( './images/src/' ) )
    spriteData.css.pipe( gulp.dest( './styles/generated/' ) )
} )

gulp.task( 'imagemin', function() {
    return gulp.src( './images/src/*.{gif,jpeg,jpg,png}' )
        .pipe( imagemin( [
            imagemin.gifsicle( { interlaced: true } ),
	        imagemin.jpegtran( { progressive: true } ),
	        imagemin.optipng( { optimizationLevel: 5 } )
         ] ) )
        .pipe( gulp.dest('./images') )
} )

gulp.task( 'watcher', function() {
    gulp.watch( './pug/*.pug', [ 'pug' ] )
    gulp.watch( [ './styles/*.css', './styles/blocks/*.css' ], [ 'styles' ] )
} )

gulp.task( 'default', function() {
    runSequence( 'pug', 'spritesmith', 'imagemin', 'styles', 'watcher' )
} )

gulp.task( 'prod', function() {
    runSequence( 'pug', 'spritesmith', 'imagemin', 'styles' )
} )
