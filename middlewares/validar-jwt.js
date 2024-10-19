const { response } = require( 'express' );
const jwt = require( 'jsonwebtoken' );


const validarJWT = ( req, res = response, next ) => {
    
    const token = req.header( 'x-token' );

    if ( !token ) {
        return res.status( 401 ).json({
            ok: false,
            msg: 'Token requerido',
        });
    }

    try {
        
        const { uid, name } = jwt.verify( token, process.env.JWT_SECRET_SEED );

        req.uid = uid;
        req.name = name;

    } catch (error) {
        
        return res.status( 401 ).json({
            ok: false,
            msg: 'Token no se pudo verificar',
        })

    }

    next();

}

module.exports = {
    validarJWT,
}