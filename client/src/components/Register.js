import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { registerUserAction } from "../store/actions";
import { connect } from "react-redux";

const Register = ({ registerUser }) => {
  const [values, setValues] = useState({
    name: "",
    id: "",
    password: "",
    designation: "",
    about: ""
  });
  const handleSubmit = e => {
    e.preventDefault();
    registerUser(values);
  };

  const handleChange = e => {
    e.persist();

    setValues(prevValues => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value
      };
    });
  };
  return (
    <div className="Register">
      <h2>Register Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Full Name</label>
          <input
            required
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>User ID</label>
          <input required name="id" value={values.id} onChange={handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            required
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Designation</label>
          <input
            required
            type="text"
            name="designation"
            value={values.designation}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>About</label>
          <textarea
            required
            name="about"
            rows="3"
            value={values.about}
            onChange={handleChange}
          />
        </Form.Field>
        <Button color="green" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  registerUser: values => {
    dispatch(registerUserAction(values));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Register);
