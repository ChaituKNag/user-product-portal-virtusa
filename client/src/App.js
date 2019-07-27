import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";

import Header from "./components/common/Header";

import "./App.css";
import AddNewProduct from "./components/AddNewProduct";

function App({ authenticated }) {
  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <Container>
        <Router basename="pages">
          <Header />
          <Switch>
            <Route component={Home} exact path="/" />
            <Route component={Home} path="/home" />
            <Route
              render={props => {
                if (authenticated) {
                  return <ProductList {...props} />;
                } else {
                  return <Redirect to="/home" />;
                }
              }}
              exact
              path="/product"
            />
            <Route
              render={props => {
                if (authenticated) {
                  return <AddNewProduct {...props} />;
                } else {
                  return <Redirect to="/home" />;
                }
              }}
              path="/product/new"
            />
            <Route
              render={props => {
                if (authenticated) {
                  return <ProductDetails {...props} />;
                } else {
                  return <Redirect to="/home" />;
                }
              }}
              path="/product/:productId"
            />
            <Route
              render={props => {
                if (authenticated) {
                  return <UserList {...props} />;
                } else {
                  return <Redirect to="/home" />;
                }
              }}
              exact
              path="/user"
            />
            <Route
              render={props => {
                if (authenticated) {
                  return <UserDetails {...props} />;
                } else {
                  return <Redirect to="/home" />;
                }
              }}
              path="/user/:userId"
            />
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated
  };
};
export default connect(
  mapStateToProps,
  null
)(App);
