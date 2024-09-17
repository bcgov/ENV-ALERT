/* eslint-disable max-len */
/**
 * TODO:    - Remove Border CSS from MapContainer when mapping implemented
 *          - Implement Mapping Props
 *          - Have table items link to another view to display results
 *
 * @summary - Search by BC Services View container. Displays map data for users to see locations,
 *          - Users can filter by services that will filter the maps markers.
 *          - Only displays locations in range of user settings
 *          - Map does not render offline
 * @author  LocalNewsTV, Dallas Richmond
 */
/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from 'react';
import { ListItems, ServiceListItem, headers } from '../../components/lists';
import { SearchBar } from '../../components/common';
import { Mapping } from '../../components/utility';
import SingleLocation from '../../Type/SingleLocation';
import useAppService from '../../services/app/useAppService';
import { localStorageKeyExists } from '../../utils/AppLocalStorage';
import constants from '../../constants/Constants';
import CalcDistance from '../../utils/CalcDistance';
import OnlineCheck from '../../utils/OnlineCheck';
import {
  ContentContainer,
  ViewContainer,
  ServiceListContainer,
} from './bcservices.styles';

export default function BCServices() {
  const [searchQuery, setSearchQuery] = useState('');
  const { state, setAnalytics } = useAppService();
  const services = state.appData?.data ? state.appData?.data.allServices : [];
  const locations = state.appData?.data ? [
    ...state.appData.data.ServiceBCLocations,
    ...state.appData.data.ICBCLocations,
    ...state.appData.data.HealthBCLocations,
    ...state.appData.data.CourtsLocations,
    ...state.appData.data.BCHousingLocations,
  ] : [];
  const geolocationKnown = localStorageKeyExists(constants.CURRENT_LOCATION_KEY);
  const locationRange = state.settings.location_range;
  const latitude = state.currentLocation ? state.currentLocation.lat : 49.2827;
  const longitude = state.currentLocation ? state.currentLocation.long : -123.2;

  const filteredServiceSearch = services.filter((item : string) => item.toLowerCase().match(`${searchQuery.toLowerCase().trim()}`));

  const filteredLocationSearch = locations.filter((location : SingleLocation) => {
    if (geolocationKnown) {
      const locationDistance = CalcDistance({ itemData: location, currentLocation: state.currentLocation });
      if (parseFloat(locationDistance) <= locationRange) {
        return filteredServiceSearch.some((service : string) => location.services.includes(service));
      }
    }
    return false;
  });

  useEffect(() => {
    if (state.settings.analytics_opt_in && geolocationKnown) {
      const analytics = {
        latitude,
        longitude,
        usage: {
          function: 'find service',
        },
      };

      if (state.settings.offline_mode) {
        setAnalytics(false, analytics);
      } else {
        OnlineCheck()
          .then((Online) => {
            setAnalytics(Online, analytics);
          });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ViewContainer>
      <ContentContainer>
        <Mapping
          locations={filteredLocationSearch}
          currentLocation={state.currentLocation}
        />
        <ServiceListContainer>
          <SearchBar
            query={searchQuery}
            setUseState={setSearchQuery}
            handleClear={() => setSearchQuery('')}
            border={false}
            borderRadius={false}
          />
          <ListItems headers={headers}>
            {filteredServiceSearch.map((data: string, index: number) => (
              <ServiceListItem key={index} service={data} />
            ))}
          </ListItems>
        </ServiceListContainer>
      </ContentContainer>
    </ViewContainer>
  );
}
