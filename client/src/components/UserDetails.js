import React, { useEffect, useState } from "react";
import { Card, Button, Form } from "semantic-ui-react";
import {
  getUserDetailsAction,
  updateUserDetailsAction,
  deleteUserAction,
  logoutUserSuccessAction
} from "../store/actions";
import { connect } from "react-redux";

const UserDetails = ({
  match,
  user,
  getUserDetails,
  loggedInUser,
  updateUserDetails,
  deleteUser,
  logout
}) => {
  const [editMode, setEditMode] = useState();
  const [userValues, setUserValues] = useState({ ...user });

  useEffect(() => {
    if (getUserDetails) {
      getUserDetails(match.params.userId);
    }
  }, [getUserDetails, match.params.userId]);

  useEffect(() => {
    if (user) {
      setUserValues(user);
    }
  }, [user]);

  const toggleEditMode = () => {
    setEditMode(eMode => !eMode);
  };

  const handleEditSave = e => {
    e.preventDefault();
    updateUserDetails(userValues).then(() => {
      toggleEditMode();
    });
  };

  const handleChange = e => {
    e.persist();

    setUserValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleDeleteUser = () => {
    deleteUser(user.id).then(() => {
      logout();
    });
  };

  return (
    <div>
      {user && !editMode && (
        <>
          <h2>
            User Details
            {user.id === loggedInUser && (
              <>
                {` | `}
                <Button basic onClick={toggleEditMode}>
                  Edit
                </Button>
                <Button color="red" onClick={handleDeleteUser}>
                  Delete
                </Button>
              </>
            )}
          </h2>
          <Card>
            <Card.Content header={user.name} />
            <Card.Content description={user.about} />
            <Card.Content extra>
              <b>Profession: </b> {user.designation}
            </Card.Content>
          </Card>
        </>
      )}
      {user && editMode && (
        <Form onSubmit={handleEditSave}>
          <Form.Field>
            <label>User Full Name</label>
            <input
              required
              name="name"
              value={userValues.name}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>About you</label>
            <input
              required
              name="about"
              value={userValues.about}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Designation</label>
            <input
              required
              name="designation"
              value={userValues.designation}
              onChange={handleChange}
            />
          </Form.Field>
          <Button color="green">Update</Button>
          <Button color="red" basic type="reset" onClick={toggleEditMode}>
            Cancel
          </Button>
        </Form>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    loggedInUser: state.authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: id => {
      dispatch(getUserDetailsAction(id));
    },
    updateUserDetails: values => {
      return dispatch(updateUserDetailsAction(values));
    },
    deleteUser: userId => {
      return dispatch(deleteUserAction(userId));
    },
    logout: () => {
      dispatch(logoutUserSuccessAction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetails);
