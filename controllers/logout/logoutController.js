function doLogout(req, res) {
    res.json({
        dummyMessage: 'Logout'
    });
}

module.exports = {
    doLogout
}