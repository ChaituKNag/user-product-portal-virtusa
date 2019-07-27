import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  getProductDetailsAction,
  updateProductDetailsAction,
  deleteProductAction
} from "../store/actions";

const ProductDetails = ({
  match,
  history,
  product,
  getProductDetails,
  userId,
  updateProductDetails,
  deleteProduct
}) => {
  const [editMode, setEditMode] = useState();
  const [productValues, setProductValues] = useState({ ...product });

  useEffect(() => {
    if (getProductDetails) {
      getProductDetails(match.params.productId);
    }
  }, [getProductDetails, match.params.productId]);

  useEffect(() => {
    if (product) {
      setProductValues(product);
    }
  }, [product]);

  const handleEditSave = e => {
    e.preventDefault();
    updateProductDetails(productValues).then(() => {
      toggleEditMode();
    });
  };

  const handleChange = e => {
    e.persist();

    setProductValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  const toggleEditMode = () => {
    setEditMode(eMode => !eMode);
  };

  const handleDeleteProduct = () => {
    deleteProduct(product.productId).then(() => {
      history.push("/product");
    });
  };

  return (
    <div>
      {product && !editMode && (
        <>
          <h2>
            Product Details{" "}
            {userId === product.userId && (
              <>
                <Button basic onClick={toggleEditMode}>
                  Edit
                </Button>
                <Button color="red" onClick={handleDeleteProduct}>
                  Delete
                </Button>
              </>
            )}
          </h2>
          <Card>
            <Card.Content header={product.productName} />
            <Card.Content description={product.productDescription} />
            <Card.Content extra>
              <b>Price: </b> {product.productPrice}
            </Card.Content>
          </Card>
        </>
      )}

      {product && editMode && (
        <Form onSubmit={handleEditSave}>
          <Form.Field>
            <label>Product Name</label>
            <input
              required
              name="productName"
              value={productValues.productName}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Product Description</label>
            <input
              required
              name="productDescription"
              value={productValues.productDescription}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Product Price</label>
            <input
              required
              name="productPrice"
              value={productValues.productPrice}
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
    product: state.currentProduct,
    userId: state.authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductDetails: id => {
      dispatch(getProductDetailsAction(id));
    },
    updateProductDetails: values => {
      return dispatch(updateProductDetailsAction(values));
    },
    deleteProduct: productId => {
      return dispatch(deleteProductAction(productId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);
