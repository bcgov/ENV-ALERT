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
  TileLayer, Marker, Popup, LayersControl, useMapEvents, Tooltip,
} from 'react-leaflet';
import * as Leaflet from 'leaflet';

import { WMSTileLayer } from 'react-leaflet/WMSTileLayer';
import { useEffect, useState } from 'react';
import { StyledPopup, PopupInfo, MapWrapperContainer } from './mapping.styles';
import SingleLocation from '../../../Type/SingleLocation';
import LocationsArray from '../../../Type/LocationsArray';
import { Button } from '../../common';
import { mappingContent } from '../../../content/content';
import useAppService from '../../../services/app/useAppService';
import FeatureResponse from '../../../Type/FeatureResponse';
import { Icons } from './Icons';
import AdvisoryArray from '../../../Type/AdvisoryArray';
import Advisory from '../../../Type/Advisory';

type CurrentLocationType = {
  lat: string;
  long: string;
};

type MappingProps = {
  advisories: AdvisoryArray;
  currentLocation: CurrentLocationType;
  onClick?: (latLng: Leaflet.LatLng) => void;
  // eslint-disable-next-line react/require-default-props
  mode: string;
};

async function checkWaterbody(event: Leaflet.LeafletMouseEvent): Promise<string> {
  const bbox = event.sourceTarget.getBounds().toBBoxString();
  const width = event.sourceTarget.getSize().x;
  const height = event.sourceTarget.getSize().y;
  const x = Math.floor(event.sourceTarget.layerPointToContainerPoint(event.layerPoint).x);
  const y = Math.floor(event.sourceTarget.layerPointToContainerPoint(event.layerPoint).y);

  const wmsGetInfoUrl = `https://openmaps.gov.bc.ca/geo/pub/WHSE_BASEMAPPING.FWA_LAKES_POLY/ows?service=WMS&version=1.1.1&request=GetFeatureInfo&query_layers=WHSE_BASEMAPPING.FWA_LAKES_POLY&layers=WHSE_BASEMAPPING.FWA_LAKES_POLY&bbox=${bbox}&feature_count=1&height=${height}&width=${width}&info_format=application%2Fjson&srs=EPSG%3A4326&x=${x}&y=${y}`;

  const response = await fetch(wmsGetInfoUrl);
  if (response) {
    const data = (await response.json()) as FeatureResponse;
    if (data && data.features && data.features.length === 1) {
      console.log(data.features[0].properties.GNIS_NAME_1);
      return data.features[0].properties.GNIS_NAME_1;
    }
  }
  return '';
}
type locationProps = {
  onClick?: (latLng: Leaflet.LatLng) => void;
  // eslint-disable-next-line react/no-unused-prop-types
  mode: string;
};
LocationMarker.defaultProps = {
  onClick: undefined,
};
export function LocationMarker({ onClick }: locationProps) {
  const [position, setPosition] = useState<any>(null);
  const [body, setBody] = useState<any>(null);

  useMapEvents({
    click: async (ex) => {
      // eslint-disable-next-line no-shadow
      const body = await checkWaterbody(ex);
      console.log(body);
      if (body != '') {
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
    <Marker position={position}>
      {body && <Tooltip permanent>{body}</Tooltip>}
      {!body && <Popup>Unknown Location</Popup>}
    </Marker>
  );
}

Mapping.defaultProps = {
  onClick: undefined,
  // eslint-disable-next-line react/default-props-match-prop-types
  mode: 'viewer',
};

function getIconFromType ( type: string) {
  switch (type) {
    case 'Animal Sighting':
      return Icons.animalSightingIcon;
    case 'Drinking Water':
      return Icons.waterAdvisoryIcon;
    case 'Swimming':
      return Icons.swimmingAdvisoryIcon;
  }
}

export default function Mapping({
  advisories, currentLocation, onClick, mode,
}: MappingProps) {
  const { state } = useAppService();
  const { lang } = state.settings;
  const lat = parseFloat(currentLocation?.lat);
  const long = parseFloat(currentLocation?.long);

  const zoomLevel = 12;
  const minZoomLevel = 7;
  const maxZoomLevel = 17;
  const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const [map, setMap] = useState<Leaflet.Map | null>(null);

  useEffect(() => {
    if (map) {
      map.setView([lat, long], zoomLevel);
    }
  }, [currentLocation]);

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
        detectRetina
      />
      <LayersControl position="topright">
        <LayersControl.Overlay name="Municipalities">
          <WMSTileLayer
            attribution=""
            layers="WHSE_LEGAL_ADMIN_BOUNDARIES.ABMS_MUNICIPALITIES_SP"
            format="image/png"
            detectRetina
            transparent
            url="https://openmaps.gov.bc.ca/geo/pub/WHSE_LEGAL_ADMIN_BOUNDARIES.ABMS_MUNICIPALITIES_SP/ows"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Water bodies">
          <WMSTileLayer
            attribution=""
            detectRetina
            layers="WHSE_BASEMAPPING.FWA_LAKES_POLY"
            format="image/png"
            transparent
            minNativeZoom={12}
            url="https://openmaps.gov.bc.ca/geo/pub/WHSE_BASEMAPPING.FWA_LAKES_POLY/ows"
          />
        </LayersControl.Overlay>
      </LayersControl>

      {!isNaN(lat) && (
        <Marker
          icon={Icons.redIcon}
          position={[lat, long]}
          eventHandlers={{
            click: (e) => {
              console.log('marker clicked', e);
            },
          }}
        >
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

      {advisories.map((item: Advisory, index: number) => (
        // eslint-disable-next-line react/no-array-index-key, max-len
        <Marker icon={getIconFromType(item.eventType)} key={index} position={[item.latitude, item.longitude]}>
          <StyledPopup>
            <h3>{item.eventType}</h3>
            <PopupInfo>
              {item.details}
            </PopupInfo>
          </StyledPopup>
        </Marker>
      ))}
    </MapWrapperContainer>
  );
}
