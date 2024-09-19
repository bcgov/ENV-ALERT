/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/**
 * @summary         -This is the main location view for mapping.
 *                  -Sorts all available locations by distance
 *                  -Only displays locations in range of user settings
 *                  -Users can filter by location search
 *                  -Analytics sent or cached if offline
 * @param locations an array of single locations pulled from the /location endpoint
 * @type {(locations : Array<SingleLocation>)}
 * @author Dallas Richmond, LocalNewsTV
 */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ListItems, AdvisoryListItem } from '../../components/lists';
import useAppService from '../../services/app/useAppService';
import { SearchBar } from '../../components/common';
// import { Mapping } from '../../components/utility';
import CalcDistance from '../../utils/CalcDistance';
import constants from '../../constants/Constants';
import { locationContent } from '../../content/content';
import { localStorageKeyExists } from '../../utils/AppLocalStorage';

import { ContentContainer, ViewContainer, ServiceListContainer } from './advisory.styles';
import Advisory from '../../Type/Advisory';

interface AdvisoryWithDistance extends Advisory {
  distance: string;
}

export default function AdvisoryView() {
  const { state } = useAppService();
  const { lang } = state.settings;
  const [searchQuery, setSearchQuery] = useState('');
  const { service } = useParams();
  const geolocationKnown = localStorageKeyExists(constants.CURRENT_LOCATION_KEY);
  const advisories = state.appData?.data ? state.appData.data || [] : [];
  const locationRange = state.settings.location_range;

  const headers: Array<string> = [];
  if (service) {
    headers.push(
      `${service} ${locationContent.headers[lang][0]}`,
      locationContent.headers[lang][1],
    );
  } else {
    headers.push(...locationContent.headers[lang]);
  }
  const filteredAdvisorySearch = advisories.filter((advisory: Advisory) => {
    if (geolocationKnown) {
      const locationDistance = CalcDistance({
        itemData: advisory,
        currentLocation: state.currentLocation,
      });
      if (parseFloat(locationDistance) <= locationRange) {
        return true; // location.locale.toLowerCase().includes(searchQuery.toLowerCase().trim());
      }
    }
    return false;
  });
  const distancedAdvisories: Array<AdvisoryWithDistance> = [];

  filteredAdvisorySearch.forEach((advisory: Advisory) => {
    const distancedAdvisory: AdvisoryWithDistance = advisory as AdvisoryWithDistance;
    distancedAdvisory.distance = CalcDistance({
      itemData: advisory,
      currentLocation: state.currentLocation,
    });
    distancedAdvisories.push(distancedAdvisory);
  });

  distancedAdvisories.sort((a: AdvisoryWithDistance, b: AdvisoryWithDistance) => (parseFloat(a.distance) > parseFloat(b.distance) ? 1 : -1));
  const unavailable = (
    <AdvisoryListItem
      itemData={{ eventType: locationContent.notImplemented[lang] } as Advisory}
      locationDistance="0"
    />
  );
  const outOfRange = (
    <AdvisoryListItem
      itemData={
        { eventType: `${locationContent.noResults[lang]} ${locationRange}KM` } as Advisory
      }
      locationDistance="0"
    />
  );

  return (
    <ViewContainer>
      <ContentContainer>
        <ServiceListContainer>
          <SearchBar
            query={searchQuery}
            setUseState={setSearchQuery}
            handleClear={() => setSearchQuery('')}
            border={false}
            borderRadius={false}
          />
          <ListItems headers={headers}>
            {distancedAdvisories.map((data: AdvisoryWithDistance) => (
              <AdvisoryListItem
                itemData={data}
                locationDistance={data.distance}
                key={data.details}
              />
            ))}
            {advisories.length === 0 && unavailable}
            {advisories.length > 0 && distancedAdvisories.length === 0 && outOfRange}
          </ListItems>
        </ServiceListContainer>
      </ContentContainer>
    </ViewContainer>
  );
}
