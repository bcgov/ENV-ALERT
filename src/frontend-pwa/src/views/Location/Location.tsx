import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ListItems, LocationList } from '../../components/lists';
import SingleLocation from '../../Type/SingleLocation';
import useAppService from '../../services/app/useAppService';
import { SearchBar } from '../../components/common';
import { Mapping } from '../../components/utility';
import CalcDistance from '../../utils/CalcDistance';
import { localStorageKeyExists } from '../../utils/AppLocalStorage';
import constants from '../../constants/Constants';
import { locationContent } from '../../content/content';
import OnlineCheck from '../../utils/OnlineCheck';
import {
  ContentContainer,
  ViewContainer,
  ServiceListContainer,
} from './location.styles';

interface LocationWithDistance extends SingleLocation {
  distance: string;
}

export default function Location() {
  const { state, setAnalytics } = useAppService();
  const { lang } = state.settings;
  const [searchQuery, setSearchQuery] = useState('');
  const { service } = useParams();
  const geolocationKnown = localStorageKeyExists(constants.CURRENT_LOCATION_KEY);
  const locations = state.appData?.data ? state.appData.data || [] : [];
  const locationRange = state.settings.location_range;
  const latitude = state.currentLocation ? state.currentLocation.lat : 49.2827;
  const longitude = state.currentLocation ? state.currentLocation.long : -123.2;
  console.log('HERE: ', state.appData.data);

  return (
    <ViewContainer>
      <ContentContainer>
        <Mapping
          locations={locations}
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
          <LocationList locations={locations} service={service} />
        </ServiceListContainer>
      </ContentContainer>
    </ViewContainer>
  );
}
