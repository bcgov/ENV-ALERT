/**
 * TODO:    - resize "Marker" icon
 *          - finalize what data will be shown within popup
 *          - move some types to constants
 *
 * @summary - Visualize user location and a list of BCservice locations onto map of British Columbia
 *          - provides limited contact information for relevant location via popup
 *          - Map is capable of rendering both online/offline, albeit at a reduced level of detail
 *
 * @param   MappingProps - passes in {lat, long} as currentLocationType, and passes
 *                       a list of BCService locations as a LocationsArray
 * @type    {MappingProps}
 *
 * @param   CurrentLocationType - passes the navigator's lat/long as a single object
 * @type    {CurrentLocationType}
 *
 * @author  Tyler Maloney, LocalNewsTV
 */
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-shadow.png';
import {
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMapEvents,
  Tooltip,
} from 'react-leaflet';
import * as Leaflet from 'leaflet';

import { WMSTileLayer } from 'react-leaflet/WMSTileLayer'
import {
  StyledPopup,
  PopupInfo,
  MapWrapperContainer
} from './mapping.styles';
import SingleLocation from '../../../Type/SingleLocation';
import LocationsArray from '../../../Type/LocationsArray';
import { Button } from '../../common';
import { mappingContent } from '../../../content/content';
import useAppService from '../../../services/app/useAppService';
import { useEffect, useState } from 'react';
import FeatureResponse from '../../../Type/FeatureResponse';
import { Icons } from './Icons';

type CurrentLocationType = {
  lat: string;
  long: string;
}

type MappingProps = {
  locations: LocationsArray;
  currentLocation: CurrentLocationType;
  onClick?: ((latLng: Leaflet.LatLng) => void);
  mode: string; //picker or viewer
}

const baseIcon = Leaflet.icon({
  iconUrl: baseIconImage,
  iconRetinaUrl: baseIconImageMobile,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 45],
});

const redIcon = Leaflet.icon({
  iconUrl: redIconImage,
  iconRetinaUrl: redIconImageMobile,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 45],
});


async function checkWaterbody(event: Leaflet.LeafletMouseEvent): Promise<string> {
  const bbox = event.sourceTarget.getBounds().toBBoxString();
  const width = event.sourceTarget.getSize().x;
  const height = event.sourceTarget.getSize().y;
  const x = Math.floor(event.sourceTarget.layerPointToContainerPoint(event.layerPoint).x);
  const y = Math.floor(event.sourceTarget.layerPointToContainerPoint(event.layerPoint).y);

  const wmsGetInfoUrl = `https://openmaps.gov.bc.ca/geo/pub/WHSE_BASEMAPPING.FWA_LAKES_POLY/ows?service=WMS&version=1.1.1&request=GetFeatureInfo&query_layers=WHSE_BASEMAPPING.FWA_LAKES_POLY&layers=WHSE_BASEMAPPING.FWA_LAKES_POLY&bbox=${bbox}&feature_count=1&height=${height}&width=${width}&info_format=application%2Fjson&srs=EPSG%3A4326&x=${x}&y=${y}`;

  let response = await fetch(wmsGetInfoUrl)
  if(response){
    const data = await response.json() as FeatureResponse;
    if (data && data['features'] && data['features'].length === 1) {
      console.log(data.features[0].properties.GNIS_NAME_1);
      return data.features[0].properties.GNIS_NAME_1;
    } else {
      
    }
  }
  return '';
}
type locationProps = {
  onClick?: ((latLng: Leaflet.LatLng) => void);
  mode: string;
}
LocationMarker.defaultProps = {
  onClick: undefined,
};
export function LocationMarker({ onClick, mode } : locationProps) {
  const [position, setPosition] = useState<any>(null);
  const [body, setBody] = useState<any>(null);
  
  useMapEvents({
    click: async (ex) => {
      let body = await checkWaterbody(ex); //TODO display Waterbody
      console.log(body);
      if(body != ''){
        setBody(body);
      } else {
        setBody(null);
      }
      setPosition(ex.latlng);
      if (onClick !== undefined) {
        onClick(ex.latlng);
      }
    },
  });
  
  return position === null ? null : (
    <Marker position={position} >
      {body && <Tooltip permanent>{body}</Tooltip>}
      {!body && <Popup>Unknown Location</Popup>}
    </Marker>
  );
} 

Mapping.defaultProps = {
  onClick: undefined,
  mode: "viewer"
};

export default function Mapping({ locations, currentLocation, onClick, mode }: MappingProps) {
  const { state } = useAppService();
  const { lang } = state.settings;
  const lat = parseFloat(currentLocation?.lat);
  const long = parseFloat(currentLocation?.long);

  const zoomLevel = 12;
  const minZoomLevel = 7;
  const maxZoomLevel = 17;
  const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

  const [map, setMap] = useState<Leaflet.Map | null>(null);

  useEffect(() => {
    if (map){
      map.setView([lat,long],zoomLevel);
    }
  }, [currentLocation])
  
  return (
        <MapWrapperContainer
          center={isNaN(lat) ? [53.7267, -127.6476] : [lat, long]}
          zoom={zoomLevel}
          minZoom={minZoomLevel}
          maxZoom={maxZoomLevel}
          scrollWheelZoom
          ref={setMap}
        >
          <LocationMarker onClick={onClick} mode={mode} />
          <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={tileLayerUrl}
                detectRetina={true}
              />
          <LayersControl position="topright">
            <LayersControl.Overlay name='Municipalities'>
              <WMSTileLayer
                attribution=''
                layers= 'WHSE_LEGAL_ADMIN_BOUNDARIES.ABMS_MUNICIPALITIES_SP'
                format= 'image/png'
                detectRetina={true}
                transparent= {true}
                url='https://openmaps.gov.bc.ca/geo/pub/WHSE_LEGAL_ADMIN_BOUNDARIES.ABMS_MUNICIPALITIES_SP/ows'
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name='Water bodies'>
              <WMSTileLayer
                attribution=''
                detectRetina={true}
                layers= 'WHSE_BASEMAPPING.FWA_LAKES_POLY'
                format= 'image/png'
                transparent= {true}
                minNativeZoom={12}
                url='https://openmaps.gov.bc.ca/geo/pub/WHSE_BASEMAPPING.FWA_LAKES_POLY/ows'/>
            </LayersControl.Overlay>
          </LayersControl>

          {!isNaN(lat)
          && (
              <Marker 
                icon={Icons.redIcon}
                position={[lat, long]}
                eventHandlers={{
                  click: (e) => {
                    console.log('marker clicked', e);
                  },
                }}>
                <Popup>
                  <h3>{mappingContent.currLocation[lang]}</h3>
                  <p>
                    {mappingContent.currLat[lang]}
                    {currentLocation.lat}
                  </p>
                  <p>
                    {mappingContent.currLong[lang]}
                    {currentLocation.long}
                  </p>
                </Popup>
              </Marker>
          )}

          {locations.map((item: SingleLocation, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <Marker icon={Icons.baseIcon} key={index} position={[item.latitude, item.longitude]}>
              <StyledPopup>
                <h3>{item.locale}</h3>
                <PopupInfo>
                  {mappingContent.type[lang]}
                  {(item.serviceType[0].toUpperCase()
                  + item.serviceType.substring(1, item.serviceType.length))}
                </PopupInfo>
                <PopupInfo>
                  {mappingContent.address[lang]}
                  {item.address.label}
                </PopupInfo>
                <PopupInfo>
                  {mappingContent.phone[lang]}
                  <Link to={`tel:+${item.contact?.phone?.replaceAll('-', '').replaceAll(' ', '')}`}>{item.contact?.phone}</Link>
                </PopupInfo>
                <Link to={`/location/${item.serviceType}/${item.locale}`}>
                  <Button
                    text="More Info"
                    variant="primary"
                    size="sm"
                    disabled={false}
                  />
                </Link>
              </StyledPopup>
            </Marker>
          ))}
        </MapWrapperContainer>
  );
}
