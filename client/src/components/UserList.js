import React, { useEffect } from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUsersAction } from "../store/actions";

const UserList = ({ getUsers, users }) => {
  useEffect(() => {
    if (getUsers) {
      getUsers();
    }
  }, [getUsers]);
  return (
    <>
      <h2>Products</h2>
      <div>
        {users && users.length > 0 && (
          <Card.Group>
            {users.map(user => (
              <Card key={user.id}>
                <Card.Content>
                  <Card.Header>
                    <Link to={`/user/${user.id}`}>{user.name}</Link>
                  </Card.Header>
                  <Card.Meta>{user.designation}</Card.Meta>
                  <Card.Description>{user.about}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        )}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => {
      dispatch(getUsersAction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
