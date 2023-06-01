import { express } from "express";
const paymntData = require("../controllers/paymentController")
const router = express.Router();

router.post('/cheackout', paymntData.cheackout);
router.post('/paymentverification', paymntData.paymentVerification);

module.exports = router