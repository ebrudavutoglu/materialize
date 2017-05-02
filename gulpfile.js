var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    jsmin = require('gulp-jsmin'),
    jshint = require('gulp-jshint'),
    inject = require('gulp-inject'),
    debug = require('gulp-debug'),
    imagemin = require('gulp-imagemin');

var config = {};

config.path = {
    app: {
        css:'app/assets/css/',
        jsSrc: 'app/assets/js/',
        imgSrc:'app/assets/image/',
        map: 'app/assets/maps/',
        htmlSrc:'app/assets/'
    },
    source:{
        scss:'source/tpl/scss/',
        jsDist:'source/tpl/js/',
        imgDist:'source/tpl/image/',
        htmlDist:'source/tpl/'
    }
};


gulp.task('sass', function () {
    return gulp.src(config.path.source.scss+'*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(sourcemaps.write('../maps'))
        .pipe(rename({suffix: '.min'}))
        .pipe(debug({title: 'unicorn:'}))
        .pipe(gulp.dest(config.path.app.css));
});


gulp.task('js', function () {
    gulp.src(config.path.source.jsDist+'*.js')
    //.pipe(browserify())
        .pipe(sourcemaps.init())
        .pipe(jsmin())
        .pipe(jshint())
        .pipe(sourcemaps.write('../maps'))
        .pipe(rename({suffix: '.min'}))
        .pipe(debug({title: 'unicorn:'}))
        .pipe(gulp.dest(config.path.app.jsSrc));
});

gulp.task('index', function () {
    var target = gulp.src(config.path.source.htmlDist+'*.html')
    .pipe(debug({title: 'unicorn:'}))
    var sources = gulp.src([config.path.app.jsSrc+'*.js', config.path.app.css+'*.css'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest(config.path.app.htmlSrc));
});

gulp.task('image', function () {
    gulp.src(config.path.source.imgDist+'*')
        .pipe(imagemin())
        .pipe(gulp.dest(config.path.app.imgSrc))
});



gulp.task('default', function() {

});