import {Component, Input, OnInit} from '@angular/core';
import { CinemaInterface } from 'src/app/interfaces/cinema.interface';
declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private _cinema: CinemaInterface;

  @Input('cinema')
  set cinema(cinema: CinemaInterface) {
    if (cinema != undefined) {
      this._cinema = cinema;
      if (cinema.name === 'Białystok Helios Alfa') {
        this.setCenter(53.1252582, 23.1685194);
      } else if (cinema.name === 'Białystok Helios Biała') {
        this.setCenter(53.1223598, 23.176877);
      } else if (cinema.name === 'Białystok Helios Jurawiecka') {
        this.setCenter(53.1365746, 23.1631379);
      }
    }
  }
  get cinema(): CinemaInterface { return this._cinema; }

  longitude = 19.134422;
  latitude = 52.215933;
  map: any;

  constructor() { }

  ngOnInit() {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 5
      })
    });

    const layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [
          new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([this.latitude, this.longitude])),
            // geometry: new ol.geom.Point(ol.proj.transform([this.latitude, this.longitude], 'EPSG:4326', 'EPSG:3857')),
            style: new ol.style.Style({
              image: new ol.style.Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: 'data/icon.png'
              })
            })
          })
        ]
      })
    });
    this.map.addLayer(layer);

  }

  setCenter(latitude: number, longitude: number) {
    const view = this.map.getView();
    var location = ol.proj.fromLonLat([longitude, latitude]);
    var duration = 2000;
    var zoom = 16;//view.getZoom();
    var parts = 2;
    var called = false;
    function callback(complete) {
      --parts;
      if (called) {
        return;
      }
      if (parts === 0 || !complete) {
        called = true;
        // done(complete);
      }
    }
    view.animate({
      center: location,
      duration: duration
    }, callback);
    view.animate({
      zoom: zoom - 1,
      duration: duration / 2
    }, {
      zoom: zoom,
      duration: duration / 2
    }, callback);

    // view.setCenter(ol.proj.fromLonLat([longitude, latitude]));
    // view.setZoom(16);
  }
}

