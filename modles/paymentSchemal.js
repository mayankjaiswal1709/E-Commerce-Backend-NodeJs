import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({

    razorpay_order_id: {
        type: String,
        requird: true,

    },
    razorpay_payment_id: {
        type: String,
        requird: true,

    },
    razorpay_signature: {
        type: String,
        requird: true,
    }
});
paymentSchema.set('timestamps', true)
export const Payment = mongoose.model("Payment", paymentSchema);
