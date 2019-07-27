import React, { useEffect } from "react";
import { Card, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProductsAction } from "../store/actions";

const ProductList = ({ getProducts, products, history }) => {
  useEffect(() => {
    if (getProducts) {
      getProducts();
    }
  }, [getProducts]);

  const handleAddNewProduct = () => {
    history.push("/product/new");
  };

  return (
    <>
      <h2>Products</h2>
      <div style={{ marginBottom: 20 }}>
        <Button color="green" onClick={handleAddNewProduct}>
          Add New Product
        </Button>
      </div>
      <div>
        {products && products.length > 0 ? (
          <Card.Group>
            {products.map(product => (
              <Card key={product.productId}>
                <Card.Content>
                  <Card.Header>
                    <Link to={`/product/${product.productId}`}>
                      {product.productName}
                    </Link>
                  </Card.Header>
                  <Card.Meta>Price: Rs. {product.productPrice}</Card.Meta>
                  <Card.Description>
                    {product.productDescription}
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        ) : (
          <p>No products yet</p>
        )}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => {
      dispatch(getProductsAction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
