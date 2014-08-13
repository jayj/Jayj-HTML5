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

        // Watch for file changes
        watch: {
            sass: {
                files: [ '<%= config.src %>/sass/**/*.scss' ],
                tasks: [ 'sass:dev', 'autoprefixer' ],
            },
            js: {
                files: [ '<%= config.src %>/js/{,*/}*.js' ],
                tasks: [ 'newer:jshint:js' ]
            },
            images: {
                files: [ '<%= config.src %>/images/{,*/}*' ],
                tasks: [ 'newer:imagemin' ]
            },
            grunt: {
                files: [ 'Gruntfile.js' ],
                tasks: [ 'jshint:grunt' ]
            }
        },

        // Compile Sass
        sass: {
            dev: {
                files: {
                    '<%= config.src %>/css/style.css': '<%= config.src %>/sass/main.scss'
                },
                options: {
                    style: 'expanded',
                }
            }
        },

        // Autoprefix the compiled CSS
        autoprefixer: {
            dev: {
                options: {
                    browsers: [ 'last 2 version', 'ie 9' ]
                },
                src: '<%= config.src %>/css/style.css',
                dest: '<%= config.src %>/css/style.css'
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            grunt: {
                src: [ 'Gruntfile.js' ]
            },
            js: {
                src: [ '<%= config.src %>/js/{,*/}*.js' ]
            }
        },

        // Minify CSS
        cssmin: {
            build: {
                expand: true,
                src: [ 'css/style.css' ],
                cwd: '<%= config.build %>/',
                dest: '<%= config.build %>/',
                ext: '.min.css'
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
