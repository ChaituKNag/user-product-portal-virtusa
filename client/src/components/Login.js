import React, { useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { loginUserAction } from "../store/actions";

const Login = ({ loginUser }) => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    loginUser(userid, password).catch(() => {
      console.log("login failed");
      setShowError(true);
    });
  };

  const handleUseridChange = e => {
    e.persist();
    setUserid(e.target.value);
    setShowError(false);
  };

  const handlePasswordChange = e => {
    e.persist();
    setPassword(e.target.value);
    setShowError(false);
  };

  return (
    <div className="Login" style={{ marginBottom: 30 }}>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>User ID</label>
          <input name="userid" onChange={handleUseridChange} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handlePasswordChange}
          />
        </Form.Field>
        <Button primary type="submit">
          Submit
        </Button>
        {<Message visible={showError} error content="Error while logging in" />}
      </Form>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (username, password) => {
      return dispatch(loginUserAction(username, password));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
