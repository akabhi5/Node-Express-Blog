const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');


// USER REGISTRATION
const registration = async (req, res) => {
    // validation of data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    // save and return new user
    try {
        const savedUser = await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header('auth-token', token)
            .header('access-control-expose-headers', 'auth-token')
            .send({ user: user._id, name: user.name });
    } catch (err) {
        res.status(400).send(err);
    }
}


// USER LOGIN
const login = async (req, res) => {
    // data validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // existence check of user
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email doesn't exist");

    // password check
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid Password');

    // create and assign a token
    const token = jwt.sign({ _id: user._id, name: user.name }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
}



module.exports.registration = registration;
module.exports.login = login;