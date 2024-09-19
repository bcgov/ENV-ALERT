/**
 * @summary A reusable component that returns a table row item to be displayed in a list
 * @param itemData - is the data passed in to be displayed in each list item
 * @type {(itemData : Advisory)}
 */
// import { Link } from 'react-router-dom';
import Advisory from '../../../Type/Advisory';

import { TableData, TableRow, TableDataWrapper } from './advisorylistitem.styles';

export type ListItemProps = {
  itemData: Advisory;
  locationDistance: string;
};

export default function AdvisoryListItem({
  itemData,
  locationDistance,
}: ListItemProps) {
  return (
    <TableRow>
      <TableData>
        <TableDataWrapper>{itemData.eventType}</TableDataWrapper>
      </TableData>
      <TableData>
        <TableDataWrapper>{itemData.details}</TableDataWrapper>
      </TableData>
      <TableData>
        <TableDataWrapper>{`${locationDistance} KM`}</TableDataWrapper>
      </TableData>
    </TableRow>
  );
}
