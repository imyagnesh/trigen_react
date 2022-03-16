import React, { useContext } from 'react';
import { Formik, Field } from 'formik';
import Input from '../../../components/input';
import { AuthContext } from '../../../context/authContext';

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

    <Formik
      initialValues={{
        email: '',
        password: '',
        remember_me: false,
      }}
      onSubmit={(values, action) => {
        const { remember_me, ...rest } = values;
        login(rest, action);
      }}>
      {({
        values,
        handleChange,
        handleSubmit,
        isValid,
        dirty,
        errors,
      }) => (
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="remember"
            defaultValue="true"
          />
          {errors.serverError && (
            <p className="text-lg text-center text-red-500">
              {errors.serverError}
            </p>
          )}

          {/* <input
            type="text"
            name="email"
            className="border"
            value={loginData.email}
            onChange={onChangeText}
          />
          <input
            type="text"
            name="password"
            className="border"
            value={loginData.password}
            onChange={onChangeText}
          /> */}

          <div className="rounded-md -space-y-px">
            {fields.map(field => (
              <Field key={field.name} {...field} />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                checked={values.remember_me}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#forgotPassword"
                className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={!(isValid && dirty)}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400">
              Sign in
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};
export default Login;
