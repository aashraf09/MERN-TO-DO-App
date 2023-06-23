const User = require('../model/User')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password){
        return res.status(400).json({'message': 'one of the inputs may be missing'})
    }
    const duplicate = await User.findOne({email: email}).exec()
    if (duplicate) return res.sendStatus(409);
    try{
        const hashedPwd = await bcrypt.hash(password, 10)
        const result = await User.create({
            'username': name,
            'email': email,
            'password': hashedPwd
        })
        console.log(result)
        res.status(201).json({
            'success': `new user ${name} created`
        })
    } catch (err){
        res.status(500).json({
            'message': err.message
        })
    }
}

module.exports = {handleNewUser}