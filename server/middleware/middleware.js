import  {verifyJwt}  from "../functions/function";

export const userAuthCheckByLocal = async (req, res, next) => {
    try {
        let jsonObj = req.headers;
        console.log("jsonon obj",jsonObj)
        let token = jsonObj['x-custom-header'];
        if (token) {
            const isTokenValid = await verifyJwt(token);
            if (isTokenValid) {
                req.body.tokenData = isTokenValid
                next()
               
            } else {
                res.send({
                    code: 400,
                    msg: 'Authentication is required'
                });
            }
        }

    } catch (e) {
        console.log('errro', e);
        res.send({
            code: 444,
            msg: 'Some error has occured!'
        })
    }

}

