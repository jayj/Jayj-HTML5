module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// Compile Less
		less: {
			dev: {
				files: {
					'css/style.css': 'less/style.less'
				}
			}
		},
		// Watch for file changes
		watch: {
			less: {
				files: [ 'less/*.less' ],
				tasks: [ 'less' ],
				options: {
					livereload: true,
				},
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
				src: ['**', '!.gitignore', '!node_modules/**'],
				dest: 'build/',
			},
		},
		// Compress the build folder into a zip file
		compress: {
			build: {
				options: {
					archive: 'build/jayj-html5-template-<%= pkg.version %>.zip'
				},
				cwd: 'build/',
				src: ['**/*'],
				dest: 'jayj-html5-template/'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-imagemin');


	// Default task
	grunt.registerTask( 'default', [ 'watch' ] );

	// Pre-build task
	grunt.registerTask( 'pre-build', [ 'less', 'imagemin' ]);

	// Build task
	grunt.registerTask( 'build', [ 'clean:build', 'copy:build', 'compress:build' ]);

};
