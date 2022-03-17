import React, { useContext } from 'react';
import { Formik, Field } from 'formik';
import Input from '../../../components/input';
import { AuthContext } from '../../../context/authContext';
import CustomForm from '../../../components/CustomForm';
import Checkbox from '../../../components/Checkbox';

const fields = [
  {
    name: 'email',
    component: Input,
    placeholder: 'Email Address',
    autoComplete: 'email',
    id: 'email-address',
    type: 'email',
    isFirst: true,
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
    autoComplete: 'current-password',
    id: 'password',
    validate: value => {
      if (!value) {
        return 'required...';
      }
      return '';
    },
    isLast: true,
  },
];

const Login = () => {
  const { login } = useContext(AuthContext);

  return (
    // const [loginData, setLoginData] = useState({
    //   email: '',
    //   password: '',
    // });

    // const onChangeText = event => {
    //   setLoginData(val => ({
    //     ...val,
    //     [event.target.name]: event.target.value,
    //   }));
    // };

    // console.log(loginData);

    <CustomForm
      initialValues={{
        email: '',
        password: '',
        remember_me: false,
      }}
      onSubmit={login}
      fields={fields}
      btnTitle="Sign in">
      <div className="flex items-center justify-between">
        <Field
          name="remember_me"
          component={Checkbox}
          id="remember_me"
          label="Remember me"
        />

        <div className="text-sm">
          <a
            href="#forgotPassword"
            className="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </a>
        </div>
      </div>
    </CustomForm>
  );
};
export default Login;
