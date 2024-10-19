/**
 ** Auth Routes
 ** host + /api/auth
 */

const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const { validarJWT } = require( '../middlewares/validar-jwt' );
const { crearUsuario, loginUsuario, revalidarToken } = require( '../controllers/auth' );
const router = Router();


router.post( 
    '/new',
    [
        check( 'name', 'nombre es obligatorio' ).notEmpty(),
        check( 'email', 'email es obligatorio' ).isEmail(),
        check( 'password', 'password debe ser de 6 caracteres' ).isLength({ min: 6 }),
        validarCampos,
    ],
    crearUsuario );

router.post( 
    '/',
    [
        check( 'email', 'email es obligatorio' ).isEmail(),
        check( 'password', 'password debe ser de 6 caracteres' ).isLength({ min: 6 }),
        validarCampos,
    ],
    loginUsuario );

router.get( '/renew', [ validarJWT ], revalidarToken );


module.exports = router;