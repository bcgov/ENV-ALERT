/**
 * @summary - This page will dictate styling for our map and relevant components
 * @author  Tyler Maloney, LocalNewsTV
 */

import styled from '@emotion/styled';
import typography from 'typography';
import {
  MapContainer,
  Popup,
} from 'react-leaflet';
import mq from '../../../constants/mq';

export const MapWrapperContainer = styled(MapContainer)`
    ${typography.toString()}
    height: 100%;
    width: 100%;
`;

export const StyledPopup = styled(Popup)`
    ${typography.toString()}
`;

export const PopupInfo = styled.p`
    margin: 0;
    padding: 0;
`;
export const StyledPopupDiv = styled.div`
    ${typography.toString()}
    max-height: 10em;
    overflow-y: auto;
`;

export const MapTilesNotFoundDiv = styled.div`
    color: darkred;
    align-items: center;
    justify-content: center;
    padding: 3em;
`;
