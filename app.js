const express = require("express");
const app = express();
const port = 3000;
const db = require("./common/connect");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Get all Categories
app.get("/category", (req, res) => {
  const query = "SELECT * FROM Category";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching categories: ", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Get all Users
app.get("/user", (req, res) => {
  const query = "SELECT * FROM `User`";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users: ", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Get all Teas
app.get("/tea", (req, res) => {
  const query = "SELECT * FROM Tea";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching teas: ", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

//Get tea in category
app.get("/tea/:id/category", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM Tea where CategoryId = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching teas: ", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Get all Vouchers
app.get("/voucher", (req, res) => {
  const query = "SELECT * FROM Voucher";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching vouchers: ", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Get all Payment Methods
app.get("/paymentmethod", (req, res) => {
  const query = "SELECT * FROM PaymentMethod";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching payment methods: ", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Get all Shipping Methods
app.get("/shippingmethod", (req, res) => {
  const query = "SELECT * FROM ShippingMethod";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching shipping methods: ", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Add a new order
app.post("/order", (req, res) => {
  const { userId, orderDate, orderItems, paymentMethodId, shippingMethodId } =
    req.body;

  // Insert the order into the Order table
  const orderQuery = "INSERT INTO `Order` (UserId, `Date`) VALUES (?, ?)";
  connection.query(orderQuery, [userId, orderDate], (err, result) => {
    if (err) {
      console.error("Error adding order: ", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const orderId = result.insertId;

      // Insert order items into OrderItem table
      const orderItemQuery =
        "INSERT INTO OrderItem (OrderId, TeaId, Quanlity) VALUES (?, ?, ?)";
      orderItems.forEach((orderItem) => {
        connection.query(
          orderItemQuery,
          [orderId, orderItem.teaId, orderItem.quantity],
          (err, result) => {
            if (err) {
              console.error("Error adding order item: ", err);
            }
          }
        );
      });

      // Insert payment method into OrderPayment table
      const orderPaymentQuery =
        "INSERT INTO OrderPayment (Orderid, PaymentMethodId) VALUES (?, ?)";
      connection.query(
        orderPaymentQuery,
        [orderId, paymentMethodId],
        (err, result) => {
          if (err) {
            console.error("Error adding payment method: ", err);
          }
        }
      );

      // Insert shipping method into OrderShipping table
      const orderShippingQuery =
        "INSERT INTO OrderShipping (OrderId, ShippingMethodId) VALUES (?, ?)";
      connection.query(
        orderShippingQuery,
        [orderId, shippingMethodId],
        (err, result) => {
          if (err) {
            console.error("Error adding shipping method: ", err);
          }
        }
      );

      res.json({ message: "Order added successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
