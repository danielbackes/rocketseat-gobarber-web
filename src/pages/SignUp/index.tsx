import React from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';

import logoImage from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => (
  <Container>
    <Background />

    <Content>
      <img src={logoImage} alt="GoBarber" />
      <form>
        <h1>Create account</h1>

        <Input name="name" icon={FiUser} placeholder="Name" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Password"
        />

        <Button type="submit">Create</Button>
      </form>

      <a href="login">
        <FiArrowLeft />
        Go back
      </a>
    </Content>
  </Container>
);

export default SignUp;
