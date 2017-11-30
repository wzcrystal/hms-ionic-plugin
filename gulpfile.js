var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var runSequence = require('gulp-run-sequence');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch('./src/*.scss',['plugin-sass']);
  gulp.watch('./src/*.js',['plugin-js']);
  gulp.watch('./src/*.html',['plugin-html']);
});

// var dist = 'www/lib/hand-ionic-plugin-lov';
var dist = 'www/lib';
// scss编译后的css
gulp.task('plugin-sass', function (done) {
   gulp.src("src/**/*.scss")
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(dist))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(dist))
    .on('end', done);
});

gulp.task('plugin-js', function (done) {
   gulp.src("src/**/*.js")
    .pipe(gulp.dest(dist))
    .on('end', done);
});

gulp.task('plugin-html', function (done) {
   gulp.src("src/**/*.html")
    .pipe(gulp.dest(dist))
    .on('end', done);
});


gulp.task('build-plugin', ['plugin-js', 'plugin-sass', 'plugin-html']);

gulp.task('release-plugin', function(done){
  dist = 'release';
  runSequence('build-plugin',done);
});
