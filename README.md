## Leaflet Coordinates

[![NPM version](https://img.shields.io/npm/v/@muhammedkalender/leaflet-coordinates.svg)](https://www.npmjs.com/package/@muhammedkalender/leaflet-coordinates)

Basen On [Leaflet.Coordinates](https://github.com/Leaflet/Leaflet)
===================

### What is this?
A [Leaflet](https://github.com/Leaflet/Leaflet) plugin to view mouse coordinates. Also the user can change the coordinates and get a marker on that position viewing the coordinates.

*Tested with Leaflet 0.5+*

<img src="http://mrmufflon.github.io/Leaflet.Coordinates/images/screen_1.png"/>

<img src="http://mrmufflon.github.io/Leaflet.Coordinates/images/screen_2.png"/>

### Demo anyone?
[Have a look](http://mrmufflon.github.io/Leaflet.Coordinates/examples/demo.html)

### How to use?
```javascript
L.control.coordinates({
	position:"bottomleft", //optional default "bootomright"
	decimals:2, //optional default 4
	decimalSeperator:".", //optional default "."
	labelTemplateLat:"Latitude: {y}", //optional default "Lat: {y}"
	labelTemplateLng:"Longitude: {x}", //optional default "Lng: {x}"
	enableUserInput:true, //optional default true
	useDMS:false, //optional default false
	useLatLngOrder: true, //ordering of labels, default false-> lng-lat
	markerType: L.marker, //optional default L.marker
	markerProps: {}, //optional default {},
	labelFormatterLng : funtion(lng){return lng+" lng"}, //optional default none,
	labelFormatterLat : funtion(lat){return lat+" lat"}, //optional default none
	customLabelFcn: function(latLonObj, opts) { "Geohash: " + encodeGeoHash(latLonObj.lat, latLonObj.lng)} //optional default none,
	removeLabel: 'Remove'
}).addTo(map);
```

### License
<a rel="license" href="http://creativecommons.org/licenses/by/3.0/deed.en_US"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/3.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/3.0/deed.en_US">Creative Commons Attribution 3.0 Unported License</a>.
