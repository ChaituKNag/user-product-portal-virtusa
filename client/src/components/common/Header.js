import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { connect } from 'react-redux';
import { logoutUserAction } from "../../store/actions";

const Header = ({logout, authenticated}) => {
  const handleLogout = (e) => {
    logout();
  }
  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <Button.Group basic>
        <Button size="mini">
          <NavLink to="/home">Home</NavLink>
        </Button>
        <Button size="mini">
          <NavLink to="/product">Products</NavLink>
        </Button>
        <Button size="mini">
          {" "}
          <NavLink to="/user">Users</NavLink>
        </Button>
        {authenticated && <Button basic color="red" onClick={handleLogout}>
          Logout
        </Button>}
      </Button.Group>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logoutUserAction());
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
