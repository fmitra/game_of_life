module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: [
          'assets/styles/**/*.scss',
          'assets/styles/**/*.sass'
        ],
        tasks: ['compass']
      },
      js: {
        files: [
          'assets/scripts/**/*.js'
        ],
        tasks: ['uglify']
      }
    },
    compass: {
      dist: {
        options: {
          require: 'susy',
          sassDir: 'assets/styles',
          cssDir: 'public/assets',
          cssPath: 'public/assets',
          outputStyle: 'compressed'
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/assets/main.min.js': [
            'assets/scripts/game_of_life.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch']);
};