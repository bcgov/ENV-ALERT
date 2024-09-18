/* eslint-disable jsx-a11y/control-has-associated-label */
/**
 * @summary Reusable back button navigation component
 */
import { useSSO } from '@bcgov/citz-imb-sso-react';
// import useAppService from '../../../services/app/useAppService';
import {
  StyledLoginButton,
} from './loginButton.styles';

export default function LoginButton() {
  const {
    isAuthenticated,
    login,
    logout,
  } = useSSO();
  // const {
  //   setAuthentication,
  //   state,
  // } = useAppService();
  //   state.isAuthenticated ? (
  //     <StyledLoginButton onClick={() => setAuthentication(false)}>
  //       LOGOUT
  //     </StyledLoginButton>
  //   ) : (
  //     <StyledLoginButton onClick={() => setAuthentication(true)}>
  //       LOGIN
  //     </StyledLoginButton>
  //   )
  // );
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
