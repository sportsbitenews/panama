
module.exports = function(grunt) {
  "use strict";

  // Config...
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9001,
          // Prevents Grunt to close just after the task (starting the server) completes
          // This will be removed later as `watch` will take care of that
          keepalive: true
        }
      }
    },
    open: {
      all: {
        path: 'http://localhost:9001'
      }
    }
  });


  // Load tasks...
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  // Task aliases and tasks
  grunt.registerTask('server', [
    'open',
    'connect'
  ]);

};
