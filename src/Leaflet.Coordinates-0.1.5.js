/*! Leaflet.Coordinates 02-03-2016 */
L.Control.Coordinates = L.Control.extend({
  options: {
    position: 'bottomright',
    decimals: 4,
    decimalSeperator: '.',
    labelTemplateLat: 'Lat: {y}',
    labelTemplateLng: 'Lng: {x}',
    labelFormatterLat: void 0,
    labelFormatterLng: void 0,
    enableUserInput: !0,
    useDMS: !1,
    useLatLngOrder: !1,
    centerUserCoordinates: !1,
    markerType: L.marker,
    markerProps: {
      shadowUrl: 'marker-shadow.png'
    },
    removeLabel: 'Remove'
  }, onAdd: function(a) {
    this._map = a;
    var b = 'leaflet-control-coordinates', c = this._container = L.DomUtil.create('div', b), d = this.options;
    this._labelcontainer = L.DomUtil.create('div', 'uiElement label', c), this._label = L.DomUtil.create('span', 'labelFirst', this._labelcontainer), this._inputcontainer = L.DomUtil.create('div', 'uiElement input uiHidden', c);
    var e, f;
    return d.useLatLngOrder ? (f = L.DomUtil.create('span', '', this._inputcontainer), this._inputY = this._createInput('inputY', this._inputcontainer), e = L.DomUtil.create('span', '', this._inputcontainer), this._inputX = this._createInput('inputX', this._inputcontainer)) : (e = L.DomUtil.create('span', '', this._inputcontainer), this._inputX = this._createInput('inputX', this._inputcontainer), f = L.DomUtil.create('span', '', this._inputcontainer), this._inputY = this._createInput('inputY', this._inputcontainer)), e.innerHTML = d.labelTemplateLng.replace('{x}', ''), f.innerHTML = d.labelTemplateLat.replace('{y}', ''), L.DomEvent.on(this._inputX, 'keyup', this._handleKeypress, this), L.DomEvent.on(this._inputY, 'keyup', this._handleKeypress, this), a.on('mousemove', this._update, this), a.on('dragstart', this.collapse, this), a.whenReady(this._update, this), this._showsCoordinates = !0, d.enableUserInput && L.DomEvent.addListener(this._container, 'click', this._switchUI, this), c;
  }, _createInput: function(a, b) {
    var c = L.DomUtil.create('input', a, b);
    return c.type = 'text', L.DomEvent.disableClickPropagation(c), c;
  }, _clearMarker: function() {
    this._map.removeLayer(this._marker);
  }, _handleKeypress: function(a) {
    switch (a.keyCode) {
      case 27:
        this.collapse();
        break;
      case 13:
        this._handleSubmit(), this.collapse();
        break;
      default:
        this._handleSubmit();
    }
  }, _handleSubmit: function() {
    var a = L.NumberFormatter.createValidNumber(this._inputX.value, this.options.decimalSeperator),
      b = L.NumberFormatter.createValidNumber(this._inputY.value, this.options.decimalSeperator);
    if (void 0 !== a && void 0 !== b) {
      var c = this._marker;
      c || (c = this._marker = this._createNewMarker(), c.on('click', this._clearMarker, this));
      var d = new L.LatLng(b, a);
      c.setLatLng(d), c.addTo(this._map), this.options.centerUserCoordinates && this._map.setView(d, this._map.getZoom());
    }
  }, expand: function() {
    this._showsCoordinates = !1, this._map.off('mousemove', this._update, this), L.DomEvent.addListener(this._container, 'mousemove', L.DomEvent.stop), L.DomEvent.removeListener(this._container, 'click', this._switchUI, this), L.DomUtil.addClass(this._labelcontainer, 'uiHidden'), L.DomUtil.removeClass(this._inputcontainer, 'uiHidden');
  }, _createCoordinateLabel: function(a) {
    var b, c, d = this.options;
    return d.customLabelFcn ? d.customLabelFcn(a, d) : (b = d.labelLng ? d.labelFormatterLng(a.lng) : L.Util.template(d.labelTemplateLng, { x: this._getNumber(a.lng, d) }), c = d.labelFormatterLat ? d.labelFormatterLat(a.lat) : L.Util.template(d.labelTemplateLat, { y: this._getNumber(a.lat, d) }), d.useLatLngOrder ? c + ' ' + b : b + ' ' + c);
  }, _getNumber: function(a, b) {
    var c;
    return c = b.useDMS ? L.NumberFormatter.toDMS(a) : L.NumberFormatter.round(a, b.decimals, b.decimalSeperator);
  }, collapse: function() {
    if (!this._showsCoordinates) {
      this._map.on('mousemove', this._update, this), this._showsCoordinates = !0;
      this.options;
      if (L.DomEvent.addListener(this._container, 'click', this._switchUI, this), L.DomEvent.removeListener(this._container, 'mousemove', L.DomEvent.stop), L.DomUtil.addClass(this._inputcontainer, 'uiHidden'), L.DomUtil.removeClass(this._labelcontainer, 'uiHidden'), this._marker) {
        var a = this._createNewMarker(), b = this._marker.getLatLng();
        a.setLatLng(b);
        var c = L.DomUtil.create('div', ''), d = L.DomUtil.create('div', '', c);
        d.innerHTML = this._createCoordinateLabel(b);
        var e = L.DomUtil.create('a', '', c);
        e.innerHTML = this.options.removeLabel, e.href = '#';
        var f = L.DomEvent.stopPropagation;
        L.DomEvent.on(e, 'click', f).on(e, 'mousedown', f).on(e, 'dblclick', f).on(e, 'click', L.DomEvent.preventDefault).on(e, 'click', function() {
          this._map.removeLayer(a);
        }, this), a.bindPopup(c), a.addTo(this._map), this._map.removeLayer(this._marker), this._marker = null;
      }
    }
  }, _switchUI: function(a) {
    L.DomEvent.stop(a), L.DomEvent.stopPropagation(a), L.DomEvent.preventDefault(a), this._showsCoordinates ? this.expand() : this.collapse();
  }, onRemove: function(a) {
    a.off('mousemove', this._update, this);
  }, _update: function(a) {
    var b = a.latlng, c = this.options;
    b && (b = b.wrap(), this._currentPos = b, this._inputY.value = L.NumberFormatter.round(b.lat, c.decimals, c.decimalSeperator), this._inputX.value = L.NumberFormatter.round(b.lng, c.decimals, c.decimalSeperator), this._label.innerHTML = this._createCoordinateLabel(b));
  }, _createNewMarker: function() {
    return this.options.markerType(null, this.options.markerProps);
  }
}), L.control.coordinates = function(a) {
  return new L.Control.Coordinates(a);
}, L.Map.mergeOptions({ coordinateControl: !1 }), L.Map.addInitHook(function() {
  this.options.coordinateControl && (this.coordinateControl = new L.Control.Coordinates, this.addControl(this.coordinateControl));
}), L.NumberFormatter = {
  round: function(a, b, c) {
    var d = L.Util.formatNum(a, b) + '', e = d.split('.');
    if (e[1]) {
      for (var f = b - e[1].length; f > 0; f--) e[1] += '0';
      d = e.join(c || '.');
    }
    return d;
  }, toDMS: function(a) {
    var b = Math.floor(Math.abs(a)), c = 60 * (Math.abs(a) - b), d = Math.floor(c), e = 60 * (c - d), f = Math.round(e);
    60 == f && (d++, f = '00'), 60 == d && (b++, d = '00'), 10 > f && (f = '0' + f), 10 > d && (d = '0' + d);
    var g = '';
    return 0 > a && (g = '-'), '' + g + b + '&deg; ' + d + '\' ' + f + '\'\'';
  }, createValidNumber: function(a, b) {
    if (a && a.length > 0) {
      var c = a.split(b || '.');
      try {
        var d = Number(c.join('.'));
        return isNaN(d) ? void 0 : d;
      } catch (e) {
        return void 0;
      }
    }
    return void 0;
  }
};
