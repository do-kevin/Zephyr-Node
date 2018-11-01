/**
 * Middleware Helper
 */

// Middleware ---------------------------------------- /

// Check for logged-in users
const sessionCheckerHome = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/profile');
    } else {
        next();
    }
};

// Check for logged-out users
const sessionCheckerAway = (req, res, next) => {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/');
    } else {
        next();
    }
};

// Check cookie + session: delete cookie if no session
const handleCookieSessionCheck = (req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
};

// Export Middleware ---------------------------------------- /

module.exports = {
    handleCookieSessionCheck,
    sessionCheckerHome,
    sessionCheckerAway
};
