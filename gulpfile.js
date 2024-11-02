const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function compilaSass(){
    return gulp.src('sass/**/*.scss')
        .pipe(sass({
            outputStyle : 'compressed'
        }))
        .pipe(autoprefixer({
            overrideBrowserslist : ['last 2 versions'],
            cascade : false,
        }))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream());
}

gulp.task('sass', compilaSass);

function gulpJs(){
    return gulp.src('js/scripts/*.js')
        .pipe(concat('main.js'))
        .pipe(babel({
            presets : ['@babel/env'],
        }))
        .pipe(uglify())
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.stream());
}

gulp.task('all-js', gulpJs);

function pluginsCss(){
    return gulp.src('./css/lib/*.css')
    .pipe(concat('plugins.css'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}

gulp.task('plugins-css', pluginsCss);

function pluginsJs() {
    return gulp.src([
        './js/lib/plugin.js',
    ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('./js/'))
    .pipe(browserSync.stream());
}

gulp.task('plugins-js', pluginsJs);

function browser(){
    browserSync.init({
        server : {
            baseDir : './',
        },
    })
}

gulp.task('browser-sync', browser);

function Watch(){
    gulp.watch('./sass/**/*.scss', compilaSass);
    gulp.watch('./css/lib/*.css', pluginsCss);

    gulp.watch('*.html').on('change', browserSync.reload);

    gulp.watch('./js/scripts/*.js', gulpJs);
    gulp.watch('./js/lib/*.js', pluginsJs);

}

gulp.task('watch', Watch);

// Default Tasks

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'plugins-css', 'all-js', 'plugins-js'));