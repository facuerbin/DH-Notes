module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        res.locals.session = req.session.user;
    }
    return next();
}