import jwt from 'jsonwebtoken';
import "dotenv/config";


const generarJWT = ( uid: any ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.LLAVE_JWT!, {
            expiresIn: '24h'
        }, ( err, token ) => {

            if ( err ) {
                // no se pudo crear el token
                reject('No se pudo generar el JWT');

            } else {
                // TOKEN!
                resolve( token );
            }

        })

    });


}


export {
    generarJWT
}