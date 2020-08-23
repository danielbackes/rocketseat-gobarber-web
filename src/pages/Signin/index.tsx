import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import logoImage from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImage} alt="GoBarber" />
      <form>
        <h1>Do your login</h1>

        <input placeholder="E-mail" />

        <input type="password" placeholder="Password" />

        <button type="submit">Sign In</button>

        <a href="forgot">Forgot password?</a>
      </form>

      <a href="login">
        <FiLogIn />
        Create account
      </a>
    </Content>

    <Background />
  </Container>
);

export default SignIn;
