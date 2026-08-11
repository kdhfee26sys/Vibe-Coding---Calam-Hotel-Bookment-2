import React from 'react';
import { AuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};
