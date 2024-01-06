const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

function doLogin(req, res) {
    res.cookie('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2MzFmOTJhLTA4YTMtNGU0MC05ZjA4LTgxMWEwZmJmM2VhNiIsImlhdCI6MTcwNDU1NjgyMiwiZXhwIjoxNzA0ODE2MDIyfQ.FH_uNhKhyrSnxY999aNHq3DXiGQBPArZVM9GwV9KfuQ', { httpOnly: true, maxAge: maxAge * 1000 });
    res.json({
        dummyMessage: 'Login'
    });
}


module.exports = {
    doLogin,
}