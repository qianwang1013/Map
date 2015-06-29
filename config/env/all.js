'use strict';

module.exports = {
	app: {
		title: 'Map',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/leaflet/dist/leaflet.css',
				'public/lib/leaflet.markercluster/dist/MarkerCluster.css',
				'public/lib/leaflet.markercluster/dist/MarkerCluster.Default.css',
				'public/lib/font-awesome/css/font-awesome.css',		
				'public/lib/toastr/toastr.css',
				'public/lib/angular-leaflet-directive/dist/leaflet.extra-markers.css'
			],
			js: [
				'public/lib/jquery/dist/jquery.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/leaflet/dist/leaflet.js',
				'public/lib/leaflet.markercluster/dist/leaflet.markercluster.js',
				'public/lib/toastr/toastr.js',
				'public/lib/angular-leaflet-directive/dist/leaflet.extra-markers.js',
				'public/lib/angular-leaflet-directive/dist/angular-leaflet-directive.min.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
