const express = require("express");
const app = express();
const cors = require('cors');
const stripe = require("stripe")('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

app.use(express.static("public"));
app.use(express.json());
// Configuring cross-domain
app.use(cors());

const calculateOrderAmount = (items) => {
    return 1400;
};
// Get Payment Method
app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});
// Payment Success Response
app.get("/", async (req, res) => {
    res.send("Pay successfully！");
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));