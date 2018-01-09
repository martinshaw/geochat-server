// Setup path resolution for Module requirements
const path = require("path");
// Create path resolution helper function
var p = (file) => { return path.resolve(process.cwd(), file); };

//
const express = require('express');
const bodyParser = require('body-parser');
const tilestrata = require('tilestrata');
const disk = require('tilestrata-disk');
const sharp = require('tilestrata-sharp');
const mapnik = require('tilestrata-mapnik');
const dependency = require('tilestrata-dependency');
var strata = tilestrata();


// Create object returned when module is required by another script
var GCMapService = {};



GCMapService.init = (_port) => {

	GCMapService.app = express();

	strata.layer('basemap')
		.route('tile@2x.png')
			.use(disk.cache({dir: p("operations/mapservice/tiles/basemap") }))
			.use(mapnik({
				pathname: p("operations/mapservice/tiles/map.xml"),
				tileSize: 512,
				scale: 2
			}))
		.route('tile.png')
			.use(disk.cache({dir: p("operations/mapservice/tiles/basemap") }))
			.use(dependency('basemap', 'tile@2x.png'))
			.use(sharp(function(image, sharp){
				return image.resize(256);
			}));
	
	GCMapService.app.use(tilestrata.middleware({
		server: strata,
		prefix: '/maps'
	}));

	GCMapService.app.listen(_port);
	
	console.log('GC Map Service available at port  ' + _port);


}





module.exports = GCMapService;
