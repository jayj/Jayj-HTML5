module.exports = function(grunt) {

    // Load all grunt tasks matching the `grunt-*` pattern
    require( 'load-grunt-tasks' )(grunt);

    // Configurable paths
    var config = {
        src: 'src',
        build: 'build'
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: config,
        // Compile Sass
        sass: {
            dev: {
                files: {
                    'css/style.css': 'sass/main.scss'
                },
                options: {
                    style: 'expanded',
                    sourcemap: true
                }
            }
        },
        // Watch for file changes
        watch: {
            css: {
                files: [ 'sass/**/*.scss' ],
                tasks: [ 'sass:dev', 'autoprefixer:dev' ],
                options: {
                    livereload: true,
                },
            }
        },
        // Autoprefix the compiled CSS
        autoprefixer: {
            dev: {
                options: {
                    browsers: ['last 2 version', 'ie 8', 'ie 9']
                },
                src: 'css/style.css',
                dest: 'css/style.css'
            }
        },
        // Minify CSS
        cssmin: {
            build: {
                files: {
                    'css/style.min.css': 'css/style.css'
                }
            }
        },
        // Minify images
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'images/'
                }]
            }
        },
        // Clean the build folder
        clean: {
            build: {
                src: ['build/']
            }
        },
        // Copy to build folder
        copy: {
            build: {
                src: ['**', '!.gitignore', '!node_modules/**', '!.css.map'],
                dest: 'build/',
            },
        },
        // Compress the build folder into a zip file
        compress: {
            build: {
                options: {
                    archive: '<%= config.build %>/jayj-html5-theme-<%= pkg.version %>.zip'
                },
                cwd: 'build/',
                src: ['**/*'],
                dest: 'jayj-html5-theme/'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task
    grunt.registerTask( 'default', [ 'watch' ] );

    // Generate CSS task
    grunt.registerTask( 'css', [ 'sass', 'autoprefixer' ]);

    // Pre-build task
    grunt.registerTask( 'pre-build', [ 'sass', 'autoprefixer', 'cssmin:build', 'imagemin' ]);

    // Build task
    grunt.registerTask( 'build', [ 'clean:build', 'copy:build', 'compress:build' ]);

};
