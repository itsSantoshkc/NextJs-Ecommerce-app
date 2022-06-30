import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
// const CryptoJS = require("crypto-js");
import CryptoJS from 'crypto-js'
// const AES = require("crypto-js/aes");
import AES from 'crypto-js/aes'
const SHA256 = require("crypto-js/sha256");


const handler = async (req, res) => {
    // console.log(SHA256("Message"));
    if (req.method == 'POST') {
        const { name, email } = req.body
        let u = new User({ name, email, password: CryptoJS.AES.encrypt(req.body.password, 'secret key 123').toString() })
        await u.save()
        res.status(200).json({ success: "success" })
    }
    else {
        res.status(400).json({ error: "This Method is Not Allowed" })
    }
}
export default connectDb(handler)
