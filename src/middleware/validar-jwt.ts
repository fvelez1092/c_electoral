import {Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'

const validateJWT = ( req:any, res:Response, next:NextFunction ) => {

    // Leer token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'no token in request'
        });
    }

    try {

        const  uid  = jwt.verify( token, process.env.JWT_KEY! );
        req.uid = uid;        
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalid'
        })
    }




}


export  {
    validateJWT
}


