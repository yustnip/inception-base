var gulp = require( 'gulp' ),
    spritesmith = require( 'gulp.spritesmith' ),
    imagemin = require( 'gulp-imagemin' ),
    postcss = require( 'gulp-postcss' ),
    concat = require( 'gulp-concat' ),
    runSequence = require( 'run-sequence' ),
    bemClasses = require( 'gulp-bem-classes' ),
    sass = require( 'gulp-sass' ),
    sassGlob = require( 'gulp-sass-glob' ),
    autoprefixer = require( 'autoprefixer' ),
    fileInclude = require( 'gulp-file-include' )

gulp.task( 'blocks', function() {
    return gulp.src( './templates/blocks/*.php' )
        .pipe( bemClasses( { blockPerFile: true } ) )
        .pipe( gulp.dest( './templates/blocks/generated' ) )
} )

gulp.task( 'templates', function() {
    return gulp.src( './templates/*.php' )
        .pipe( fileInclude( {
            prefix: '@@',
            basepath: './templates/blocks/generated',
            indent: true
        } ) )
        .pipe( bemClasses() )
        .pipe( gulp.dest( './' ) )
} )

gulp.task( 'styles', function() {
    return gulp.src( './styles/root.scss' )
        .pipe( sassGlob() )
        .pipe( sass( { outputStyle: 'expanded' } ) )
        .pipe( postcss( [ autoprefixer() ] ) )
        .pipe( concat( 'style.css' ) )
        .pipe( gulp.dest( './' ) )
} )

gulp.task( 'spritesmith', function() {
    var spriteData = gulp.src( './images/src/sprite/*.png' ).pipe( spritesmith( {
        imgName: 'sprite.png',
        imgPath: 'images/sprite.png',
        cssName: 'sprite.scss'
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
    gulp.watch( './templates/**/*.php', function() {
        runSequence( 'blocks', 'templates' )
    } )
    gulp.watch( [ './styles/*.scss', './styles/blocks/*.scss' ], [ 'styles' ] )
} )

gulp.task( 'default', function() {
    runSequence( 'blocks', 'templates', 'spritesmith', 'imagemin', 'styles', 'watcher' )
} )

gulp.task( 'prod', function() {
    runSequence( 'blocks', 'templates', 'spritesmith', 'imagemin', 'styles' )
} )
