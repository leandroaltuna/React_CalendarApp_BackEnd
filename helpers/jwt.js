const jwt = require( 'jsonwebtoken' );

const generarJWT = ( uid, name ) => {
    
    return new Promise( ( resolve, reject ) => {

        const payload = { uid, name };

        jwt.sign( payload, process.env.JWT_SECRET_SEED, {
            expiresIn: '2h',
        }, ( err, token ) => {

            if ( err ) {
                console.log( err );
                reject( 'Token no generado' );
            }

            resolve( token );

        });

    });

}

module.exports = {
    generarJWT,
}