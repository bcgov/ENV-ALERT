import React from 'react';
import LocationListItem from '../LocationListItem/LocationListItem';
import SingleLocation from '../../../Type/SingleLocation';

type LocationListProps = {
  locations: SingleLocation[];
  service?: string;
};

// eslint-disable-next-line react/function-component-definition
const LocationList: React.FC<LocationListProps> = ({ locations, service }) => (
  <div>
    {locations.map((location) => (
      <LocationListItem
        key={location.locale}
        itemData={location}
        locationDistance={location.distance || '0'}
        service={service}
      />
    ))}
  </div>
);

LocationList.defaultProps = {
  service: '',
};

export default LocationList;
