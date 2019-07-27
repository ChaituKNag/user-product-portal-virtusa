import { actions } from "./root.reducer";
import axios from "axios";

export const usersFetchedAction = users => ({
  type: actions.USER_LIST_FETCHED,
  users
});

export const userDetailsFetchedAction = details => ({
  type: actions.USER_DETAILS_FETCHED,
  user: details
});

export const getUsersAction = () => dispatch => {
  return axios.get("http://localhost:3002/app/user").then(res => {
    dispatch(usersFetchedAction(res.data));
  });
};

export const getUserDetailsAction = id => dispatch => {
  return axios.get(`http://localhost:3002/app/user/${id}`).then(res => {
    dispatch(userDetailsFetchedAction(res.data));
  });
};

export const productsFetchedAction = products => ({
  type: actions.PRODUCT_LIST_FETCHED,
  products
});

export const productDetailsFetchedAction = details => ({
  type: actions.PRODUCT_DETAILS_FETCHED,
  product: details
});

export const getProductsAction = () => dispatch => {
  return axios.get(`http://localhost:3002/app/product`).then(res => {
    dispatch(productsFetchedAction(res.data));
  });
};

export const getProductDetailsAction = productId => dispatch => {
  return axios
    .get(`http://localhost:3002/app/product/${productId}`)
    .then(res => {
      dispatch(productDetailsFetchedAction(res.data));
    });
};

export const addProductAction = values => dispatch => {
  return axios.post(`http://localhost:3002/app/product/addnew`, {
    data: values
  });
};

export const updateProductDetailsAction = values => dispatch => {
  return axios
    .post(`http://localhost:3002/app/product/${values.productId}/update`, {
      data: values
    })
    .then(res => {
      dispatch(productDetailsFetchedAction(res.data));
    });
};

export const deleteProductAction = productId => dispatch => {
  return axios.delete(`http://localhost:3002/app/product/${productId}/delete`, {
    data: {
      productId
    }
  });
};

export const updateUserDetailsAction = values => dispatch => {
  return axios
    .post(`http://localhost:3002/app/user/${values.id}/update`, {
      data: values
    })
    .then(res => {
      dispatch(userDetailsFetchedAction(res.data));
    });
};

export const deleteUserAction = userId => dispatch => {
  return axios.delete(`http://localhost:3002/app/user/${userId}/delete`, {
    data: {
      userId
    }
  });
};

export const loginUserSuccessAction = username => ({
  type: actions.LOGIN_SUCCESS,
  authId: username
});

export const loginUserAction = (username, password) => dispatch => {
  return axios
    .post(`http://localhost:3002/app/user/login`, {
      data: {
        username,
        password
      }
    })
    .then(res => {
      console.log("user authenticated");
      dispatch(loginUserSuccessAction(username));
      return res;
    });
};

export const logoutUserSuccessAction = () => ({
  type: actions.LOGOUT_SUCCESS
});

export const logoutUserAction = () => dispatch => {
  return axios.post(`http://localhost:3002/app/user/logout`).then(res => {
    dispatch(logoutUserSuccessAction());
  });
};

export const registerUserAction = values => dispatch => {
  console.log("registering user");
  return axios
    .post(`http://localhost:3002/app/user/register`, {
      data: {
        ...values
      }
    })
    .then(res => {
      console.log(res);
      dispatch(loginUserSuccessAction(values.id));
      return res;
    });
};
