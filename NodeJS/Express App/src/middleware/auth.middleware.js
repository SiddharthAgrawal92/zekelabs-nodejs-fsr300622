const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    //auth with header
    // const access_token = req.headers.authorization;

    //auth with cookie
    let access_token = null;
    let refresh_token = null;
    if (req.originalUrl === '/auth/refresh') {
        refresh_token = req.cookies && req.cookies.refresh_token ? req.cookies.refresh_token : null;
        if (!refresh_token) {
            return res.status(403).send({ msg: "Token is required" });
        }
    } else {
        access_token = req.cookies && req.cookies.access_token ? req.cookies.access_token : null;
        if (!access_token) {
            return res.status(403).send({ msg: "Token is required" });
        }
    }


    try {
        let decoded = null;
        if (req.originalUrl === '/auth/refresh') {
            decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_TOKEN_KEY);
        } else {
            decoded = jwt.verify(access_token, process.env.JWT_ACCESS_TOKEN_KEY);
        }
        req.claims = decoded;
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).send({ msg: 'Invalid token is supplied' })
        }
    }
    return next();
}

module.exports = verifyToken;