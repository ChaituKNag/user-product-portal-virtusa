const initialState = {
  users: [],
  products: [],
  currentUser: null,
  currentProduct: null,
  loading: false,
  authenticated: null
};

const actions = {
  USER_LIST_FETCHED: "USER_LIST_FETCHED",
  USER_DETAILS_FETCHED: "USER_DETAILS_FETCHED",
  PRODUCT_LIST_FETCHED: "PRODUCT_LIST_FETCHED",
  PRODUCT_DETAILS_FETCHED: "PRODUCT_DETAILS_FETCHED",
  LOADING: "LOADING",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS"
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actions.USER_LIST_FETCHED:
      return {
        ...state,
        users: action.users,
        loading: false
      };
    case actions.USER_DETAILS_FETCHED:
      return {
        ...state,
        currentUser: action.user,
        loading: false
      };
    case actions.PRODUCT_LIST_FETCHED:
      return {
        ...state,
        products: action.products,
        loading: false
      };
    case actions.PRODUCT_DETAILS_FETCHED:
      console.log("product fetched", action.product);
      return {
        ...state,
        currentProduct: action.product,
        loading: false
      };
    case actions.LOADING:
      return {
        ...state,
        loading: true
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: action.authId,
        loading: false
      };
    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: null
      };

    default:
      return state;
  }
}

export default rootReducer;
export { actions };
