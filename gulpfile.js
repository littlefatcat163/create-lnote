const gulp = require("gulp");
const uglify = require("gulp-uglify");
const clean = require("gulp-clean");


gulp.task('clean', function() {
	return gulp.src('test/*')
	.pipe(clean())
})

//压缩组件页面js代码
gulp.task('minifyjs', function () {
	return gulp.src(['dist/**/*.mjs'])
    //.pipe(rename({suffix: '.min'}))
	.pipe(
		uglify({
			mangle:true,//类型：Boolean 默认：true 是否修改变量名
			compress:true,//类型：Boolean 默认：true 是否完全压缩
			//preserveComments: all //保留所有注释
		})
	)
    .pipe(gulp.dest('test'))
});

// 默认任务
gulp.task('default', gulp.parallel('clean', 'minifyjs'));
