module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['*.js', 'client/js/brisco/**/*.js', 
                'client/js/api/**/*.js', 'server/db/**/*.js']
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
                    paths: ["client/css/bootstrap"]
                },
                files: {
                    "client/css/bootstrap.css": "client/css/bootstrap/all.less"
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.registerTask('default', ['jshint', 'jasmine_node', 'less']);
    grunt.registerTask('test', ['jasmine_node']);
};
