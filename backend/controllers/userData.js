const User = require('../model/User')
// const bcrypt = require('bcrypt')

const handleUserData = async (req, res) => {
    const {name, email, tasks} = req.body;
    if (!name || !email || !tasks){
        return res.status(400).json({
            'message': 'email and task are required'
        })
    }
    const foundUser = await User.findOne({email: email}).exec()
    if (!foundUser) {
        return res.status(401).json({
            'message': 'user does not exist'
        })
    }
        foundUser.todos = [tasks];
        const result = await foundUser.save();
        console.log(result)
        res.json({
            email,
            name
        })
}

module.exports = {handleUserData}