import React from "react";
import Login from "./Login";
import Register from "./Register";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Home = ({ authenticated }) => {
  return (
    <div className="Home">
      {authenticated && (
        <div>
          <p>Login successful.</p>

          <Link to="/product">Go to Products</Link>
        </div>
      )}
      {!authenticated && (
        <div style={{ width: 400 }}>
          <Login />
          <hr />
          <Register />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated
  };
};
export default connect(
  mapStateToProps,
  null
)(Home);
