import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { withRouter, Redirect } from 'react-router-dom';
import { loginUser } from '../utils/actions';

function Login({ setIsLoggedIn, history, isLoggedIn }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const requiredFieldValidate = (value) => {
    let error;
    if (!value) {
      error = 'Please fill all the required fields';
    }
    return error;
  };

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    const error = await loginUser(values, () => {
      setIsSubmitting(false);
      setError('');
      setIsLoggedIn(true);
      history.push('/inbox');
    });
    if (error) {
      setError(error);
      setIsSubmitting(false);
    }
  };

  return isLoggedIn ? (
    <Redirect to="/inbox" />
  ) : (
    <div className="row mt-5">
      <div className="col">
        <h1 className="text-center">Login</h1>
        <div className="card m-auto">
          <div className="card-body ">
            <h5 className="card-title col">Welcome Back!</h5>

            <div className="card-text">
              <Formik
                initialValues={{
                  // Inital values ARE TESTING ACCORDING TO PATTERNS
                  username: '',
                  password: '',
                }}
                onSubmit={onSubmit}
              >
                {({ errors, touched, isValid }) => (
                  <Form name="loginForm" method="post">
                    <div className="form-group">
                      <label>
                        <b>Username</b>
                      </label>
                      <Field
                        className="form-control"
                        name="username"
                        validate={requiredFieldValidate}
                      />
                      {errors.username && touched.username && (
                        <div>{errors.username}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>
                        <b>Password</b>
                      </label>
                      <Field
                        className="form-control"
                        name="password"
                        type="password"
                        // ref={this.password}
                        validate={requiredFieldValidate}
                      />
                      {errors.password && touched.password && (
                        <div>{errors.password}</div>
                      )}
                    </div>
                    {isSubmitting ? (
                      <button
                        type="button"
                        className="btn btn-outline-secondary mr-2"
                      >
                        Please Wait...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-outline-secondary mr-2"
                        disabled={!isValid}
                      >
                        Login
                      </button>
                    )}
                    <div className="has-validation">
                      {' '}
                      <p className="mt-2" style={{ color: 'red' }}>
                        {error}
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
