const { response } = require( 'express' ); //? No genera mas carga a la aplicacion. Se utiliza para el intellisense al momento de codificar. Se puede omitir.
const bcrypt = require( 'bcryptjs' );
const Usuario = require( '../models/Usuario' );
const { generarJWT } = require( '../helpers/jwt' );


const crearUsuario = async ( req, res = response ) => {
    
    const { email, password } = req.body;

    try {
        
        let user = await Usuario.findOne({ email });
        // console.log( usuario );
        if ( user ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'Un usuario existe con ese correo',
            });
        }

        user = new Usuario( req.body );

        //* encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        //* Generar JSON Web Token - JWT
        const token = await generarJWT( user.id, user.name );
       
        res.status( 201 ).json({ 
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });

    } catch (error) {
        
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Ocurrio un error. Comuniquese con el administrador',
        });

    }

}

const loginUsuario = async ( req, res = response ) => {
    
    const { email, password } = req.body;

    try {
        
        const user = await Usuario.findOne({ email });

        if ( !user ) {
            
            return res.status( 400 ).json({
                ok: false,
                msg: 'El usuario no existe con ese correo',
            });

        }

        //* Valida passwords
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {

            return res.status( 400 ).json({
                ok: false,
                msg: 'El password es incorrecto',
            });

        }

        //* Generar JWToken
        const token = await generarJWT( user.id, user.name );

        res.status( 200 ).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });

    } catch (error) {
        
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Ocurrio un error. Comuniquese con el administrador',
        });

    }

}

const revalidarToken = async ( req, res = response ) => {
    
    const { uid, name } = req;
    const newToken = await generarJWT( uid, name );

    res.json({
        ok: true,
        newToken,
    });

}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}