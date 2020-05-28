import {Component, Input, OnInit} from '@angular/core';
import {CinemaInterface} from 'src/app/interfaces/cinema.interface';

declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private _cinema: CinemaInterface;

  longitude = 19.134422;
  latitude = 52.215933;
  map: any;

  constructor() {
  }

  @Input('cinema')
  set cinema(cinema: CinemaInterface) {
    if (cinema != undefined && (this._cinema == null || cinema.id !== this._cinema.id)) {
      this._cinema = cinema;
      if (cinema.name === 'Białystok Helios Alfa') {
        this.setCenter(53.1252582, 23.1685194);
      } else if (cinema.name === 'Białystok Helios Biała') {
        this.setCenter(53.1223598, 23.176877);
      } else if (cinema.name === 'Białystok Helios Jurawiecka') {
        this.setCenter(53.1365746, 23.1631379);
      } else if (cinema.name === 'Warszawa, Atlantic') {
        this.setCenter(52.2315835, 21.0125319);
      } else if (cinema.name === 'Warszawa, Złote Tarasy Multikino') {
        this.setCenter(52.22936025174016, 21.00182761357037);
      } else if (cinema.name === 'Warszawa, Jana Pawła II Cinema City') {
        this.setCenter(52.25723, 20.984573513195777);
      } else if (cinema.name === 'Kraków, Multikino') {
        this.setCenter(50.08915485, 19.984852415603243);
      } else if (cinema.name === 'Kraków, Park Handlowy Zakopianka Cinema City') {
        this.setCenter(50.016472841095684, 19.93062836870362);
      } else if (cinema.name === 'Kraków, Galeria Kazimierz Cinema City') {
        this.setCenter(50.05337933535389, 19.954300956774972);
      } else if (cinema.name === 'Łódź, Multikino') {
        this.setCenter(51.7590843, 19.4606);
      } else if (cinema.name === 'Łódź, Cinema City') {
        this.setCenter(51.78077257929718, 19.44896492580689);
      } else if (cinema.name === 'Łódź, Helios') {
        this.setCenter(51.74899230370643, 19.44833485984864);
      } else if (cinema.name === 'Wrocław, Magnolia Park Helios') {
        this.setCenter(51.118702926882065, 16.98746712238239);
      } else if (cinema.name === 'Wrocław, Multikino') {
        this.setCenter(51.11257535, 17.05931280945112);
      } else if (cinema.name === 'Wrocław, Wroclavia, Cinema City') {
        this.setCenter(51.09640599644113, 17.03525958283332);
      } else if (cinema.name === 'Poznań, Galeria Malta Multikino') {
        this.setCenter(52.4017726, 16.9600588);
      } else if (cinema.name === 'Poznań, Stary Browar Multikino') {
        this.setCenter(52.402704864980095, 16.924440053488933);
      } else if (cinema.name === 'Poznań, Królowej Jadwigi Multikino') {
        this.setCenter(52.399151950000004, 16.929277757582682);
      } else if (cinema.name === 'Gdańsk, Multikino') {
        this.setCenter(54.37209945, 18.627238493164096);
      } else if (cinema.name === 'Gdańsk, Forum Helios') {
        this.setCenter(54.349365, 18.643484);
      } else if (cinema.name === 'Gdańsk, Alfa Centrum Helios') {
        this.setCenter(54.4044143, 18.5877024);
      } else if (cinema.name === 'Szczecin, Multikino') {
        this.setCenter(53.433279414788096, 14.555787598696531);
      } else if (cinema.name === 'Szczecin, CHR Kupiec Helios') {
        this.setCenter(53.426960595275006, 14.542081499221638);
      }
    }
  }

  get cinema(): CinemaInterface {
    return this._cinema;
  }

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
    var zoom = 16;
    var parts = 2;
    var called = false;

    function callback(complete) {
      --parts;
      if (called) {
        return;
      }
      if (parts === 0 || !complete) {
        called = true;
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
  }
}

