/* eslint-disable jsx-a11y/control-has-associated-label */
/**
 * @summary Reusable back button navigation component
 */
import { useSSO } from '@bcgov/citz-imb-sso-react';
import {
  StyledLoginButton,
} from './loginButton.styles';

export default function LoginButton() {
  const {
    isAuthenticated,
    login,
    logout,
  } = useSSO();
  return (
    isAuthenticated ? (
      <StyledLoginButton onClick={() => logout()}>
        LOGOUT
      </StyledLoginButton>
    ) : (
      <StyledLoginButton onClick={() => login({ backendURL: 'http://localhost:3000', idpHint: 'idir', postLoginRedirectURL: '/' })}>
        LOGIN
      </StyledLoginButton>
    )
  );
}
