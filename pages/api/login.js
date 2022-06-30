import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'



const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user = await User.findOne({ email: req.body.email })
        var password = CryptoJS.AES.decrypt(user.password, 'secret key 123');
        let decryptedPassword = password.toString(CryptoJS.enc.Utf8);
        // console.log(decryptedPassword)
        // console.log(req.body.password)
        if (user) {
            if (req.body.email == user.email && req.body.password == decryptedPassword) {
                var token = jwt.sign({ email: user.email, name: user.name }, 'jwtsecret', {
                    expiresIn: '2d'
                });
                // console.log(token)
                res.status(200).json({ success: true, token })
            } else {
                res.status(400).json({ error: "Invalid Credentials" })
            }
        } else {
            res.status(400).json({ error: "No User Found" })

        }
    }
    else {
        res.status(400).json({ error: "This Method is Not Allowed" })
    }
}
export default connectDb(handler)
