const express = require("express");
const { createOrder, capturePayment } = require("../controllers/paymentController");

const router = express.Router()

router.get("/order/:totalAmt", createOrder)
router.post("/capture/:paymentId",capturePayment)

module.exports = router
