module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['*.js', 'public/js/brisco/**/*.js', 'db/**/*.js']
        },
        jasmine_node: {
            requirejs: false,
            forceExit: true,
            jUnit: {
                report: false,
                useDotNotation: true,
                consolidate: true
            }
        },
        less: {
            development: {
                options: {
                    paths: ["public/css/bootstrap"]
                },
                files: {
                    "public/css/bootstrap.css": "public/css/bootstrap/all.less"
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.registerTask('default', ['jshint', 'jasmine_node', 'less']);
};
