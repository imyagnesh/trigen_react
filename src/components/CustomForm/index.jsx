import { FastField, Formik } from 'formik';
import React from 'react';
import PropTypes from 'prop-types';

const CustomForm = ({
  fields,
  children,
  btnTitle,
  ...props
}) => (
  <Formik {...props}>
    {({ handleSubmit, isValid, dirty, errors }) => (
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

        <div className="rounded-md -space-y-px">
          {fields.map(field => (
            <FastField key={field.name} {...field} />
          ))}
        </div>
        {children}
        <div>
          <button
            type="submit"
            disabled={!(isValid && dirty)}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400">
            {btnTitle}
          </button>
        </div>
      </form>
    )}
  </Formik>
);

CustomForm.propTypes = {
  children: PropTypes.element.isRequired,
  btnTitle: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf().isRequired,
};

export default CustomForm;
