const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.COOKIE_SECRET, (err, decodedToken) => {
            if (err) {
                console.error(err.message);
                res.redirect('/login');
            } else {
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
};

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.COOKIE_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {                
                let user = await prisma.person.findUnique({
                    where: {
                        id: decodedToken.id
                    }
                });
                res.locals.user = user;
                res.locals.user.password = null;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};


module.exports = { requireAuth, checkUser };