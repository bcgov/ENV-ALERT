/**
 * @summary Reusable BC Gov Header Component
 * @author Dallas Richmond, LocalNewsTV
 */
import logo from '/logo-banner.svg';
import { BackNavButton, SettingsNavButton, LoginButton } from '../../appNav';
import { Link } from 'react-router-dom';
import { useSSO } from '@bcgov/citz-imb-sso-react';

import {
  HeaderWrapper,
  Heading,
  Banner,
  Image,
  StyledLink,
  BannerLeft,
  BannerRight,
} from './header.styles';

export default function Header() {
  const { isAuthenticated } = useSSO();
  console.log('isAuthenticated', isAuthenticated);

  return (
    <HeaderWrapper>
      <BannerLeft>
        <BackNavButton />
      </BannerLeft>
      <Banner>
        <Link to="/">
          <Image src={logo} alt="Go to the Home page" />
        </Link>
        <StyledLink href="/">
          <Heading>Wayfinder</Heading>
        </StyledLink>
      </Banner>
      <BannerRight>
        <Link to="/settings">
          <SettingsNavButton />
        </Link>
      </BannerRight>
      <LoginButton />
    </HeaderWrapper>
  );
}
