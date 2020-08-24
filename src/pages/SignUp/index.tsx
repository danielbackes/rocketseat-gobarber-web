import React, { useCallback } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logoImage from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  const handleSubmit = useCallback(async data => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Name required'),
        email: Yup.string().required('E-mail required').email('Invalid e-mail'),
        password: Yup.string().min(6, 'At least 6 character are required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImage} alt="GoBarber" />
        <Form onSubmit={handleSubmit}>
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
        </Form>

        <a href="login">
          <FiArrowLeft />
          Go back
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
