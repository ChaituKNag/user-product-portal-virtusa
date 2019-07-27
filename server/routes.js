let { users, products } = require("./data");
const router = require("express").Router();

let currentUser = null;

router.get("/user", (req, res) => {
  res.status(200).json(
    users.map(user => ({
      id: user.id,
      name: user.name,
      about: user.about,
      designation: user.designation
    }))
  );
});

router.post("/user/login", (req, res) => {
  if (req.body.data) {
    const { username, password } = req.body.data;

    if (username && password) {
      const matched = users.find(
        user => user.id === username && user.password === password
      );

      if (matched) {
        currentUser = matched.id;
        res.status(200).send("Login successful.");
      } else {
        res.status(400).send(null);
      }
    }
  } else {
    res.status(400).send(null);
  }
});

router.post("/user/logout", (req, res) => {
  currentUser = null;
  res.status(200).send("Logout successful.");
});

router.get("/user/:id", (req, res) => {
  const currentUser = users.find(user => user.id === String(req.params.id));

  if (currentUser) {
    res.status(200).json({
      id: currentUser.id,
      name: currentUser.name,
      about: currentUser.about,
      designation: currentUser.designation
    });
  } else {
    res.status(400).send("user not found");
  }
});

router.get("/product", (req, res) => {
  res.status(200).json(products);
});

router.post("/product/addnew", (req, res) => {
  const productId = String(products.length + 1);
  const values = req.body.data;
  products.unshift({
    ...values,
    productId
  });
  res.status(200).send("Added new product");
});

router.get("/product/:productId", (req, res) => {
  res
    .status(200)
    .json(
      products.find(
        product => product.productId === String(req.params.productId)
      )
    );
});

router.post("/product/:productId/update", (req, res) => {
  const values = req.body.data;
  if (products.find(p => p.productId === values.productId)) {
    products = products.map(product => {
      if (product.productId === values.productId) {
        return values;
      } else {
        return product;
      }
    });
    res.status(200).json(values);
  } else {
    res.status(400).send("Update failed, product not found");
  }
});

router.delete("/product/:productId/delete", (req, res) => {
  if (products.find(p => p.productId === req.params.productId)) {
    products = products.filter(p => p.productId !== req.params.productId);
    res.status(200).send("Product delete successful");
  } else {
    res.status(400).send("Product already deleted");
  }
});

router.post("/user/:userId/update", (req, res) => {
  const values = req.body.data;
  if (users.find(u => u.id === values.id)) {
    users = users.map(user => {
      if (user.id === values.id) {
        return values;
      } else {
        return user;
      }
    });
    res.status(200).json(values);
  } else {
    res.status(400).send("Update failed, user not found");
  }
});

router.delete("/user/:userId/delete", (req, res) => {
  if (users.find(u => u.id === req.params.userId)) {
    users = users.filter(u => u.id !== req.params.userId);
    res.status(200).send("User delete successful");
  } else {
    res.status(400).send("User already deleted");
  }
});

router.post("/user/register", (req, res) => {
  const userObj = req.body.data;
  if (userObj.id && !users.find(u => u.id === userObj.id)) {
    users.push(userObj);
    res.status(200).send("User successfully added");
  } else {
    res.status(400).send("User already exists");
  }
});

module.exports = router;
