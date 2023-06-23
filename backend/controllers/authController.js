const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) =>{
    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json({
            'message': 'email and password are required'
        })
    }
    const foundUser = await User.findOne({email: email}).exec()
    if (!foundUser) {
        // return res.sendStatus(401)
        return res.status(401).json({
            'message': 'user does not exist'
        })
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if (match){
        const todos = foundUser.todos;
        const name = foundUser.username;
        const accessToken = jwt.sign({
            "UserInfo": {
                'email': foundUser.email,
                'todos': foundUser.todos,
                'name': foundUser.username
            }
        }, process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: '30m'}
        );
        const refreshToken = jwt.sign(
            {
                'email': foundUser.email},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '1d'}
        )
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result)
        res.cookie('jwt', refreshToken, {httpOnly: true, secure: true, sameSite: 'None', maxAge: 24*60*60*1000})
        res.json({
            accessToken,
            todos,
            email,
            name
        })
    }
    else{
        res.sendStatus(401)
    }
}

module.exports = {handleLogin}