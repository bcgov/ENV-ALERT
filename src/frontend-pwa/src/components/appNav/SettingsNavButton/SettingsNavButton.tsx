/**
 * @summary Reusable settings button navigation component
 * @author Dallas Richmond
 */
import gear from '/gear-icon.svg';
import useAppService from '../../../services/app/useAppService';
import {
  StyledSettingsButton,
  StyledIcon,
} from './settingsNavButton.styles';

export default function SettingsNavButton() {
  const { state } = useAppService();
  if (state.eulaAccepted) {
    return (
      <StyledSettingsButton type="button" aria-label="Settings button">
        <StyledIcon src={gear} alt="Settings" />
      </StyledSettingsButton>
    );
  }

  return (
    <div />
  );
}
