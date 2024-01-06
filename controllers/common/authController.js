const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');


const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
const createToken = (id) => {
    return jwt.sign({ id}, process.env.COOKIE_SECRET, {
        expiresIn: maxAge
    });
};

// controller actions
module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await prisma.person.create({
            data: {
                name,
                email,
                password        
            }
        });        
        const token = createToken(user.id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user.id });
    }
    catch (err) {    
        res.status(400).json({ err });
    }

}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.person.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            res.status(400).json({ message: 'User does not exist' });
            return;
        }

        if (user.password !== password) {
            res.status(400).json({ message: 'Incorrect password' });
            return;
        }

        const token = createToken(user.id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user.id });
    }
    catch (err) {
        res.status(400).json({ err });
    }

}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}