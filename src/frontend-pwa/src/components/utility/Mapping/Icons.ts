import baseIconImage from '/marker-icon.png';
import baseIconImageMobile from '/marker-icon-2x.png';
import redIconImage from '/marker-icon-red.png';
import redIconImageMobile from '/marker-icon-2x-red.png';

import animalSighting from '/animal-sighting.png';
import swimmingAdvisory from '/swimming-advisory.png';
import waterAdvisory from '/water-advisory.png';

import * as Leaflet from 'leaflet';

export class Icons{
    public static readonly baseIcon = Leaflet.icon({
    iconUrl: baseIconImage,
    iconRetinaUrl: baseIconImageMobile,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 45],
  });
  
  public static readonly redIcon = Leaflet.icon({
    iconUrl: redIconImage,
    iconRetinaUrl: redIconImageMobile,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [25, 45],
  });

  public static readonly animalSightingIcon = Leaflet.icon({
    iconUrl: animalSighting,
    iconRetinaUrl: animalSighting,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [45, 45],
  });

  public static readonly swimmingAdvisoryIcon = Leaflet.icon({
    iconUrl: swimmingAdvisory,
    iconRetinaUrl: swimmingAdvisory,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [45, 45],
  });

  public static readonly waterAdvisoryIcon = Leaflet.icon({
    iconUrl: waterAdvisory,
    iconRetinaUrl: waterAdvisory,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [45, 45],
  });
  
}