let gulp = require('gulp');
let spawn = require('child_process').spawn;

gulp.task('default', ['watch']);

gulp.task('run', (callback) => {
  spawn('node', ['calculator.js'], {stdio: 'inherit'})
  .on('close', (errcode) => {
    callback(errcode);
  });
});

gulp.task('watch', () => {
  gulp.watch('*', ['run']);
});