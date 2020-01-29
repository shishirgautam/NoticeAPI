const jwt = require('jsonwebtoken');
function auth(req, res, next){
    const token = req.header('auth-token');
    if (!token) return res.this.status(401).send('Access Denided');

    try {
        
        const verified = jwt.verify(token, process.env.SECRET)
            req.user = verified;

    }catch(err){
        res.status(400).send('invalid token');
    }

}