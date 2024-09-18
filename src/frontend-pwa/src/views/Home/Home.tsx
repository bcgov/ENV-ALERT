/**
 * @summary The main view for the application
 * @author Dallas Richmond, LocalNewsTV
 */
import { useSSO } from '@bcgov/citz-imb-sso-react';
import { NavButton } from '../../components/appNav';
import Location from '../Location/Location';
import {
  Wrapper,
  ButtonWrapper,
  ViewContainer,
} from './home.styles';
import location from '/iconography/FindOffice.svg';
import report from '/iconography/ReportColor.svg';
import Greeting from '../../components/utility/Greeting/Greeting';
import { homeContent } from '../../content/content';
import useAppService from '../../services/app/useAppService';

export default function Home() {
  const { state } = useAppService();
  const { lang } = state.settings;
  const { isAuthenticated } = useSSO();
  return (
    <ViewContainer>
      <Wrapper>
        { isAuthenticated
          ? (
            <>
              <Greeting />
              <ButtonWrapper>
                <NavButton
                  path="/location"
                  text={homeContent.findService[lang]}
                  icon={location}
                  hex="#C8E1F8"
                />
              </ButtonWrapper>
              <ButtonWrapper>
                <NavButton
                  path="/report"
                  text={homeContent.report[lang]}
                  icon={report}
                  hex="#FDE7C6"
                />
              </ButtonWrapper>
            </>
          )
          : <Location /> }
      </Wrapper>
    </ViewContainer>
  );
}
