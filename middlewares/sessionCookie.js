module.exports = (req, res, next) => {
    if (!req.session.user && req.cookies.session) {
        req.session.user = req.cookies.session;
    }
    next();
}