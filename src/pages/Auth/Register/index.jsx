import React, { useContext } from 'react';
import CustomForm from '../../../components/CustomForm';
import DatePicker from '../../../components/DatePicker';
import Input from '../../../components/Input';
import { AuthContext } from '../../../context/authContext';

const fields = [
  {
    id: 'txtName',
    name: 'name',
    component: Input,
    placeholder: 'Name',
    autoComplete: 'name',
    type: 'text',
    isFirst: true,
    validate: value => {
      if (!value) {
        return 'required...';
      }
      return '';
    },
  },
  {
    id: 'birth-date',
    name: 'birthDate',
    component: DatePicker,
    placeholder: 'Birth Date',
    validate: value => {
      if (!value) {
        return 'required...';
      }
      return '';
    },
  },
  {
    name: 'email',
    component: Input,
    placeholder: 'Email Address',
    autoComplete: 'email',
    id: 'email-address',
    type: 'email',
    validate: value => {
      if (!value) {
        return 'required...';
      }
      return '';
    },
  },
  {
    name: 'password',
    component: Input,
    placeholder: 'Password',
    type: 'password',
    autoComplete: 'new-password',
    id: 'txtPassword',
    validate: value => {
      if (!value) {
        return 'required...';
      }
      return '';
    },
  },
  {
    name: 'confirmPassword',
    component: Input,
    placeholder: 'Confirm Password',
    type: 'password',
    autoComplete: 'new-password',
    id: 'txtConfirmPassword',
    validate: value => {
      if (!value) {
        return 'required...';
      }
      return '';
    },
    isLast: true,
  },
];

const Register = () => {
  const { register } = useContext(AuthContext);
  return (
    <CustomForm
      initialValues={{
        name: '',
        birthDate: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={register}
      fields={fields}
      btnTitle="Sign up"
    />
  );
};

export default Register;
