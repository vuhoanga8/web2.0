var gulp = require("gulp");
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var jade = require("gulp-jade");
var sass = require("gulp-sass");

//liveload
gulp.task("liveload", ['compile-sass', 'compile-jade', "run"], function(){
	browserSync.init({
		proxy: "localhost:8888",
		files: ["./client/**/*.*"],
		browser: ["google chrome"],
		port: "7000"
	});

  gulp.watch('./src/jade/*.jade', ['compile-jade']);
  gulp.watch('./src/jade/*.scss', ['compile-sass']);
});

gulp.task("run", function(cb){
	var started = false;

	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('compile-jade', function() {
  gulp.src('./src/jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./client/'))
});

gulp.task('compile-sass', function () {
   return gulp.src('./src/sass/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./client/css/'))
});
