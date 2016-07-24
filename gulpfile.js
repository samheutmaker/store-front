const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const insert = require('gulp-insert');
const babel = require('babel-core')
const webpack = require('webpack-stream');
const webpackEnv = require('webpack-env');
const webpackConfig = require(__dirname + '/util/WebPackReadConfig')();



var products = JSON.parse(fs.readFileSync('./package.json'));

const files = {
  all: [__dirname + '/app/**/*.html',
    __dirname + '/app/js/*.jsx',
    __dirname + '/app/js/**/*.jsx',
    __dirname + '/app/js/**/**/*.jsx'
  ],
  sass: [__dirname + '/app/styles/sass/**/*.scss', __dirname + '/app/styles/sass/*.scss']
};


gulp.task('sass:compile', function() {
  gulp.src(files.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest(__dirname + '/build/styles'))
});

gulp.task('sass:all', ['sass:compile'], function() {
  fs.readFile(__dirname + '/build/styles/styles.min.css', 'utf8', function(err, allCSS) {
    allCSS = ' <style> ' + allCSS + '</style>';
    gulp.src(__dirname + '/app/index.html')
      .pipe(insert.transform(function(contents, files) {

        var firstHalfStartIndex = 0;
        var firstHalfEndIndex = (contents.indexOf('<style>') > 0) ? contents.indexOf('<style>') : contents.length;

        var secondHalfSStartIndex = (contents.indexOf('</style>') > 0) ? contents.indexOf('</style>') + 8 : contents.length;
        var secondHalfEndIndex = contents.length;

        var firstHalf = contents.substr(firstHalfStartIndex, firstHalfEndIndex);
        var secondHalf = contents.substr(secondHalfSStartIndex, secondHalfEndIndex);

        return firstHalf + allCSS + secondHalf;
      }))
      .pipe(gulp.dest(__dirname + '/app/'));
  });
});


gulp.task('sass:watch', function() {
  gulp.watch(files.sass, ['sass:all']);
});

gulp.task('html:dev', function() {
  gulp.src([__dirname + '/app/**/*.html'])
    .pipe(gulp.dest(__dirname + '/build'))
})

gulp.task('assets:dev', function() {
  gulp.src([__dirname + '/app/assets/**/*'])
    .pipe(gulp.dest(__dirname + '/build/assets/'))
})

// Webpack
gulp.task('webpack:dev', function() {
  gulp.src(__dirname + '/app/js/app.jsx')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      plugins: [webpackEnv, webpackConfig],
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


gulp.task('dev:watch', function() {
  gulp.watch(files.all, ['webpack:dev', 'html:dev', 'assets:dev'])
});



gulp.task('build:dev', ['sass:all', 'webpack:dev', 'html:dev']);

gulp.task('default', ['dev:watch', 'sass:watch']);



function swallowError(err) {
  console.log(err);

  this.emit('end');
}