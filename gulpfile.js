const gulp = require('gulp');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const webpackEnv = require('webpack-env');
const concat = require('gulp-concat');
const babel = require('babel-core')

const files = {
  all: [__dirname + '/app/**/*.html',
    __dirname + '/app/*.html',
    __dirname + '/app/js/*.jsx',
    __dirname + '/app/js/**/*.jsx',
    __dirname + '/app/js/**/**/*.jsx'
  ],
  sass: [__dirname + '/app/styles/sass/**/*.scss', __dirname + '/app/styles/sass/*.scss']
};



gulp.task('html:dev', () => {
  gulp.src([__dirname + '/app/*.html', __dirname + '/app/**/*.html'])
    .pipe(gulp.dest(__dirname + '/build'))
})

// Webpack
gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/app/js/app.jsx')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      plugins: [webpackEnv],
      module: {
        loaders: [{
          test: /\.jsx$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react']
          }
        }],
      },
    }))
    .on('error', swallowError)
    .pipe(gulp.dest(__dirname + '/build/'))
});

gulp.task('sass:all', function() {
  gulp.src(files.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest(__dirname + '/build/styles'))
});



gulp.task('sass:watch', function() {
  gulp.watch(files.sass, ['sass:all']);
});


gulp.task('dev:watch', () => {
  gulp.watch(files.all, ['webpack:dev', 'html:dev'])
});

gulp.task('build:dev', ['sass:all', 'webpack:dev', 'html:dev']);

gulp.task('default', ['dev:watch', 'sass:watch']);



function swallowError(err) {
  console.log(err);

  this.emit('end');
}