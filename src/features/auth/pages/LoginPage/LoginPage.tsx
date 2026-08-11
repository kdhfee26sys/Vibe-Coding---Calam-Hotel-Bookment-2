import React from 'react';
import { AuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';
import { LoginForm } from '../../components/LoginForm/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
