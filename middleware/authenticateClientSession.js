const { fetchInfoFromClientId } = require('../controller/clientDataHandler');

/**
 * Authenticate and allow to use /dev
 * only if user is logged in, if user is logged in then populate session object 
 * with username 
 */
module.exports = (req, res, next) => {
    if (req.session.dev) {
        fetchInfoFromClientId(req.session.dev.clientId)
            .then(result => {
                if (!result) {
                    req.session.destroy();
                    return res.redirect('/dev/login')
                }
                req.session.dev.username = result.username;
                return next();
            }).catch(err => res.status(500).send({ message: err.message }))
    }
    else {
        return res.redirect('/dev/login');
    }

};


