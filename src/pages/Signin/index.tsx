import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import logoImage from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImage} alt="GoBarber" />
      <form>
        <h1>Do your login</h1>

        <Input name="email" icon={FiMail} placeholder="E-mail" />

        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Password"
        />

        <Button type="submit">Sign In</Button>

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
