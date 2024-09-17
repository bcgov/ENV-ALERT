/* eslint-disable react/jsx-no-useless-fragment */
/**
 * @summary A reusable accordion component
 * @author  Dallas Richmond
 */
import { ReactElement, useState } from 'react';
import nextArrow from '/next-arrow.svg';
import MoreInfoButton from '../MoreInfoButton/MoreInfoButton';

import {
  AccordionItem,
  AccordionContent,
  AccordionTitle,
  StyledButton,
  Image,
} from './accordion.styles';

type AccordionProps = {
  content: any;
  text: string;
  tooltip?: ReactElement<typeof MoreInfoButton>;
  handleClick?: () => void;
}

export default function Accordion({
  content,
  text,
  tooltip,
  handleClick,
}: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AccordionItem open={open} onClick={() => setOpen(!open)}>
        <AccordionTitle>
          {text}
          {tooltip}
        </AccordionTitle>
        <StyledButton
          onClick={handleClick}
        >
          <Image
            src={nextArrow}
            alt={text}
            style={{
              transform: `rotate(${open ? 90 : 0}deg)`,
              transition: 'all 0.25s',
            }}
          />
        </StyledButton>
      </AccordionItem>
      <AccordionContent open={open}>{content}</AccordionContent>
    </>
  );
}

Accordion.defaultProps = {
  tooltip: '', // Provide a default empty function
  handleClick: () => {},
};
