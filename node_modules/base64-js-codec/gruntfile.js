module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: 'build/*'
        },
        uglify: {
            options: {
                banner: grunt.file.read('banner')
            },
            build: {
                src: 'base64.js',
                dest: 'build/base64.min.js'
            }
        },
        jshint: {
            all: [ 'base64.js', 'index.js' ]
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', [ 'clean', 'uglify' ]);

};