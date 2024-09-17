/**
 * Style Components for the About+Contact Section
 */
import styled from '@emotion/styled';
import typography from '../../typography';
import mq from '../../constants/mq';

export const AboutContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
  width: 100%;
  padding: 50pt 0;
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: column;
  height: auto;
  padding: 10pt;
  width: 100%;
  max-width: 600pt;
`;
export const StyledP = styled.p`
  ${typography.toString()}
  text-align: left;
  width: 100%;
  font-size: 10pt;
`;

export const StyledHeaderTwo = styled.h2`
  ${typography.toString()}
  width: 100%;
  text-align: left;
  margin: 0.25em 0 0.75em 0;
  font-size: 2.074rem;
`;

export const StyledHeaderThree = styled.h3`
  font-size: 14pt;
  text-align: left;
  width: 100%;
  margin: 0.5em 0;
`;

export const StyledAddress = styled.address`
  ${typography.toString()}
  margin-top: 2em;
  font-size: 11pt;
`;
export const Link = styled.a`
  ${typography.toString()}
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;
export const StyledUl = styled.ul`
  ${typography.toString()}
  width: 100%;
  margin: 0;
  padding-left: 1em;
  margin-bottom: 0;
  @media (min-width: ${mq.tablet}){
    padding-left: 2em;
  }
`;
export const StyledLi = styled.li`
  padding: 0;
  margin: 0;
  font-size: 10pt;
`;
