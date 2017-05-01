var gulp = require( 'gulp' ),
    spritesmith = require( 'gulp.spritesmith' ),
    imagemin = require( 'gulp-imagemin' ),
    postcss = require( 'gulp-postcss' ),
    cssnext = require( 'postcss-cssnext' ),
    concat = require( 'gulp-concat' ),
    runSequence = require( 'run-sequence' ),
    atImport = require( 'postcss-import' ),
    bemClasses = require( 'gulp-bem-classes' )

gulp.task( 'templates', function() {
    return gulp.src( './templates/*.php' )
        .pipe( bemClasses() )
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
    gulp.watch( './templates/*.php', [ 'templates' ] )
    gulp.watch( [ './styles/*.css', './styles/blocks/*.css' ], [ 'styles' ] )
} )

gulp.task( 'default', function() {
    runSequence( 'templates', 'spritesmith', 'imagemin', 'styles', 'watcher' )
} )

gulp.task( 'prod', function() {
    runSequence( 'templates', 'spritesmith', 'imagemin', 'styles' )
} )
