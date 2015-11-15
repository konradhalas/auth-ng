'use strict';

var gulp = require('gulp');
var path = require('path');
var karma = require('karma');


gulp.task('test', function (done) {
  var config = {
    configFile: path.join(__dirname, 'karma.conf.js')
  };
  var server = new karma.Server(config, function(failCount) {
    done(failCount ? new Error("Failed " + failCount + " tests.") : null);
  });

  server.start();
});

