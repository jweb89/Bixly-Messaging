import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { sendMessage } from '../utils/actions';

function MessageForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const requiredFieldValidate = (value) => {
    let error;
    if (!value) {
      error = 'Please fill all the required fields';
    }
    return error;
  };

  const onSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    const error = await sendMessage(values, () => {
      setIsSubmitting(false);
      resetForm();
      window.location.reload();
    });
    if (error) {
      toast.error(error);
      setIsSubmitting(false);
      console.log(error);
    }
  };

  return (
    <div className="card bg-secondary fixed-bottom" style={{ borderRadius: 0 }}>
      <div className="card-body ">
        {open ? (
          <div className="card-text">
            <div
              onClick={() => setOpen(false)}
              role="button"
              tabIndex="0"
              onKeyPress={null}
              className="d-flex"
              style={{ float: 'right' }}
            >
              {' '}
              <BsFillCaretDownFill color="white" />
            </div>
            <Formik
              initialValues={{
                receiver: '',
                title: '',
                body: '',
              }}
              onSubmit={onSubmit}
            >
              {({ errors, touched, isValid }) => (
                <Form name="messageForm" method="post">
                  <div className="form-group">
                    <label>
                      <b style={{ color: 'white' }}>To</b>
                    </label>
                    <Field
                      className="form-control"
                      name="receiver"
                      validate={requiredFieldValidate}
                    />
                    {errors.receiver && touched.receiver && (
                      <div>{errors.receiver}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>
                      <b style={{ color: 'white' }}>Title</b>
                    </label>
                    <Field
                      className="form-control"
                      name="title"
                      // ref={this.password}
                      validate={requiredFieldValidate}
                    />
                    {errors.title && touched.title && <div>{errors.title}</div>}
                  </div>
                  <div className="form-group">
                    <label>
                      <b style={{ color: 'white' }}>Body</b>
                    </label>
                    <Field
                      className="form-control"
                      name="body"
                      component="textarea"
                      // ref={this.password}
                      validate={requiredFieldValidate}
                    />
                    {errors.body && touched.body && <div>{errors.body}</div>}
                  </div>
                  {isSubmitting ? (
                    <button
                      type="button"
                      className="btn btn-outline-primary mr-2"
                    >
                      Please Wait...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-outline-light mr-2"
                      disabled={!isValid}
                    >
                      Send
                    </button>
                  )}
                  {/* <div className="has-validation">
                    {' '}
                    <p className="mt-2" style={{ color: 'red' }}>
                      {error}
                    </p>
                  </div> */}
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div className="row px-4">
            <b style={{ color: 'white' }}> Send Message</b>
            <div
              onClick={() => setOpen(true)}
              role="button"
              tabIndex="0"
              onKeyPress={null}
              className="ml-3"
            >
              {' '}
              <BsFillCaretUpFill color="white" />
            </div>{' '}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageForm;
