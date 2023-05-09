import React from 'react';
import RegisterForm from '../registerForm/RegisterForm';

function Register(props) {
  const handleSubmit = (value) => {
    console.log('Form Submit:', value);
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
