var nodemon              = require('gulp-nodemon'),
	less                 = require('gulp-less'),
	clean                = require('gulp-clean'),
	notify               = require('gulp-notify'),
	plumber              = require('gulp-plumber'),
	argv                 = require('yargs').argv,
// 	LessPluginAutoPrefix = require('less-plugin-autoprefix'),
// 	autoprefixPlugin     = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] }),
	browserSync          = require('browser-sync').create(),
	reload               = browserSync.reload;

module.exports = function (gulp, config) {
	/**
	 * 清理打包之后编译的css
	 */
	gulp.task('css:clean', function () {
		return gulp.src(config.less.map(function (less) {
			return less + "*/css"
		}), { read: false })
			.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
			.pipe(clean({ force: true }))
	});

	/**
	 * 编译less文件
	 */
	gulp.task('css:less', ['css:clean'], function () {
		return gulp.src(config.less.map(function (less) {
			return less + "/less/*.less"
		}))
			.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
			.pipe(less())
			.pipe(gulp.dest(function (file) {
				return file.path.split("less", 2)[0] + "css";
			}))
	});

	gulp.task('css:watch', ['css:less'], function () {
		reload();
	});

	/**
	 *  启动自动刷新浏览器
	 */
	gulp.task('browser-sync', function () {
		browserSync.init({
			browser: "firefox",
			proxy  : "http://localhost:4200/",
			port   : "80"
		});
	});

	/**
	 *  启动node服务
	 */
	gulp.task('start', ['browser-sync'], function () {
		var stream = nodemon({
			script : './bin/www',
			ext    : 'js',
			verbose: true,
			ignore : ["bower_components/", "node_modules/", "*.json", "gulpfile.js", "tasks/", "core/"],
			env    : {
				'NODE_ENV': argv.production || 'development',
				'DEBUG'   : argv.DEBUG || 'zeev:*',
				"PORT"    : argv.PORT || 4200,
				"SOCKET"  : argv.SOCKET || 4201
			}
		}).on('start', function () {
			reload();
		}).on('restart', function () {
			//console.log('restarted!')
		}).on('crash', function () {
			console.error('Application has crashed!\n')
			stream.emit('restart', 10)  // restart the server in 10 seconds
		})
		return stream;
	})

	/**
	 *  启动watch监听
	 */
	gulp.task('default', ['start', 'css:less'], function () {
		gulp.watch(config.watch).on('change', reload);
		gulp.watch(config.less.map(function (less) {
			return less + "/less/**/*.less"
		}), ['css:watch']);

	});

}
