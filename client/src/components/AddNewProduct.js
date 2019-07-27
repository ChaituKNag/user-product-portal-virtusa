import React, { useEffect, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { addProductAction } from "../store/actions";

const AddNewProduct = ({ history, userId, addProduct }) => {
  const [productValues, setProductValues] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    userId: ""
  });

  useEffect(() => {
    setProductValues(prevValues => ({
      ...prevValues,
      userId: userId
    }));
  }, [userId]);

  const handleSave = e => {
    e.preventDefault();
    addProduct(productValues).then(() => {
      history.push("/product");
    });
  };

  const handleChange = e => {
    e.persist();

    setProductValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleCancel = e => {
    history.push("/product");
  };

  return (
    <div>
      <Form onSubmit={handleSave}>
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
        <Button color="green">Add Product</Button>
        <Button color="red" basic type="reset" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProduct: values => {
      return dispatch(addProductAction(values));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewProduct);
