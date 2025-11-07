const Order = require("../models/orderDB.js");

const createShoppingOrder = async (req, res) => {
  try {
    const { order, total, user } = req.body;

    if (!order || !total || !user) {
      return res.status(400).json({ error: "Missing order, total, or user data" });
    }

    const newOrder = new Order({
      order,
      total,
      createdBy: user,
    });

    await newOrder.save();

    res.status(201).json({
      message: "New order created successfully!",
      orderId: newOrder._id,
      total: newOrder.total,
      createdBy: newOrder.createdBy,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = createShoppingOrder;
