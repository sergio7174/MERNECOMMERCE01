const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try{
        // console.log('okay')
        // console.log(req.headers.token);
        const token = await req.headers['authorization'].split(" ")[1];
        // console.log(token)
        jwt.verify(token, process.env.JWT_SECRETKEY, (err, decode) => {
            if(err){
                console.log(err);
                res.status(200).send({success : false, message : `authentication issue`})
            }else{
                req.body.userId = decode.id;
                next();
            }
        })
    }catch(error){
        console.log(error);
        res. status(500).send({success : false, message : `authmiddlewares api issue : ${error.message}`, error});
    }
}