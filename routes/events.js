/**
 ** Event Routes
 ** host + /api/events
*/

const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validarJWT } = require( '../middlewares/validar-jwt' );
const { validarCampos } = require( '../middlewares/validar-campos' );
const isDate = require('../helpers/isDate');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require( '../controllers/events' );
const router = Router();

//* Usa el middleware para todas las rutas que estan debajo de esta linea de codigo.
router.use( validarJWT );

router.get( '/', getEventos );

router.post( '/',
    [
        check( 'title', 'Titulo es obligatorio' ).not().isEmpty(),
        check( 'start', 'Fecha de Inicio es obligatorio' ).custom( isDate ),
        check( 'end', 'Fecha de Finalizacion es obligatorio' ).custom( isDate ),
        validarCampos,
    ],
    crearEvento );

router.put( '/:id',
    [
        check( 'title', 'Titulo es obligatorio' ).not().isEmpty(),
        check( 'start', 'Fecha de Inicio es obligatorio' ).custom( isDate ),
        check( 'end', 'Fecha de Finalizacion es obligatorio' ).custom( isDate ),
        validarCampos,
    ],
    actualizarEvento );

router.delete( '/:id', eliminarEvento );


module.exports = router;