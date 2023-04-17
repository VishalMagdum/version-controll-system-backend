const { UserModel } = require('../schema/UserSchema')
const auth = require('../common/auth')

//create accont
const Signup = async function (req, res, next) {
    try {
        // console.log(req.body)
        let user = await UserModel.findOne({ email: req.body.email })
        // console.log(user)
        if (!user) {
            // let hashedPassword = await HashPassword(req.body.password)
            req.body.password = await auth.HashPassword(req.body.password)
            let user = await UserModel.create(req.body)
            let token = await auth.createToken({
                id: user._id,
                email: user.email,
                role: user.role
            })
            res.status(201).cookie("token", token).send({ success: true })

        }
        else {
            // return next(new ErrorHandler(`User With ${req.body.email} Already Exist! Plz Log In`, 400))
            res.status(400).send({ message: `User With ${req.body.email} Already Exist! Plz Log In` })
        }

    } catch (error) {
        res.status(500).send({
            message: error.message, error
        })
        // console.log(error.message)
    }
}

//login
const Login = async (req, res, next) => {
    try {
        console.log("v")
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            if (await auth.hashCompare(req.body.password, user.password)) {
                //need to create a token
                let token = await auth.createToken({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    mobile: user.mobile,
                    role: user.role
                })
                res.status(200).cookie("token", token).send({ message: "User Login successfull", success: true, })
            }
            else {
                res.status(400).send({ message: "Invalid Password" })
            }
        }
        else {
            res.status(400).send({ message: `User with email ${req.body.email} does not exist` })
        }

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error", error: error
        })
        console.log(error)
    }
}

module.exports = {
    Signup, Login,
}