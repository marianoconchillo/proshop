import express from "express";
import {
  addOrderItems,
  getOrders,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import mercadopago from "mercadopago";
import dotenv from "dotenv";
import axios from "axios";
import Order from "../models/orderModel.js";

const router = express.Router();
dotenv.config();

// ****************************************************************************
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

router.post("/payment", async function (req, res) {
  const { _id, orderItems, shippingPrice, taxPrice } = req.body;
  const preference = {
    external_reference: _id,
    items: [...orderItems, {
      title: "Extras",
      unit_price: shippingPrice + taxPrice,
      quantity: 1
    }],
    back_urls: {
      success: `https://proshopapp1999.herokuapp.com/order/${_id}`,
      failure: `https://proshopapp1999.herokuapp.com/order/${_id}`,
      pending: `https://proshopapp1999.herokuapp.com/order/${_id}`,
    },
    notification_url: "https://proshopapp1999.herokuapp.com/api/orders/webhook",
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then((data) => {
      return res.send(data.body.id);
    })
    .catch((err) => {
      console.log(err);
      return res.redirect("http://localhost:3000");
    });
});

// endpoint para pago exitoso
// router.get("/payment/success/:id", async function (req, res) {
//   try {
//     await updateOrderToPaid(req);
//     return res.redirect(
//       `https://proshopapp1999.herokuapp.com/order/${req.params.id}`
//     );
//   } catch (error) {
//     console.log(error);
//   }
// });

// endpoint para webhook
router.post("/webhook", async function (req, res) {
  if (req.query.topic === "payment") {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      };
      const { data } = await axios.get(
        `https://api.mercadopago.com/v1/payments/${req.query.id}`,
        config
      );
      if (data.status === "approved") {
        const order = await Order.findById(data.external_reference);
        if (order) {
          order.isPaid = true;
          order.paidAt = Date.now();
          order.paymentResult = {
            id: data.id,
            status: data.status,
          };
          await order.save();
        } else {
          res.status(404);
          throw new Error("Order not found");
        }
      }
    } catch (error) {
      res.send(`${req.body.status}`);
      throw new Error(error);
    }
  }
  res.send("ok");
  return res.status(200);
});

// endpoint para pago con fallo
router.get("/payment/fail/:id", function (req, res) {
  console.log(
    "FALLO",
    req.query.payment_id,
    req.query.status,
    req.query.merchant_order_id
  );
  res.redirect("http://localhost:3000");
});

// ****************************************************************************

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
