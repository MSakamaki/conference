var lrSnippet = require('connect-livereload')({
    port: 35729
});
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        nospawn: true,
        livereload: true
      },
      site: {
        files: ['**/*.html', '**/*.css']
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          middleware: function(connect, options) {
            return [
              lrSnippet, mountFolder(connect, options.base)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:9001'
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['connect', 'open', 'watch']);

};