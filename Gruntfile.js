module.exports = function(grunt) {
	/** Project configuration **/
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			options: {
				banner: '/** \n * Package name: <%= pkg.name %> \n * Publish date: <%= grunt.template.today("yyyy-mm-dd") %> \n * Author: <%= pkg.author %> \n * Description: <%= pkg.description %> \n * Version: <%= pkg.version %> \n */ \n',
			},
			default: {
				src: 'dist/<%= pkg.name %>.js',
				dest: 'dist/<%= pkg.name %>.min.js',
			},
		},
		concat: {
			options: {
				separator: ';',
				banner: '/** \n * Package name: <%= pkg.name %> \n * Publish date: <%= grunt.template.today("yyyy-mm-dd") %> \n * Author: <%= pkg.author %> \n * Description: <%= pkg.description %> \n * Version: <%= pkg.version %> \n */ \n',
			},
			default: {
				src: ['source/js/<%= pkg.name %>/<%= pkg.main %>', 'source/js/<%= pkg.name %>/prototype/*.js'],
				dest: 'dist/<%= pkg.name %>.js',
			},
		},

		/**
		 *	Clean commands
		*/

		clean: {
			js: ['dist'],
		},

		watch: {
			options: {
				livereload: true,
			},
			scripts: {
				files: ['source/js/**/*.js'],
				tasks: 'update-js',
			},
			templates: {
				files: 'index.html',
			},
		},
	});

	/** Load npm tasks from node_modules **/
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');

	/** Grunt tasks **/
	grunt.registerTask('update-js', ['clean:js', 'concat:default', 'uglify:default']);
	grunt.registerTask('default', ['update-js']);
};

// Don't cross this line ----------------------------------