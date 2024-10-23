const path = require( 'path' ); //? se agrego luego para production.

const express = require( 'express' );
require( 'dotenv' ).config();
const cors = require( 'cors' );
const { dbConnection } = require( './database/config' );


//* Crear el servidor de express.
const app = express();

//* Base de Datos
dbConnection();

//* CORS
app.use( cors() );

//* Public Directory
app.use( express.static( 'public' ) );

//* Lectura y Parseo JSON - body.
app.use( express.json() );

//* Rutas
app.use( '/api/auth', require( './routes/auth' ) );
app.use( '/api/events', require( './routes/events' ) );

//? Esta ruta se agrego luego para producion.
app.use( '*', ( req, res ) => {
   res.sendFile( path.join( __dirname, 'public/index.html' ) );
});

//* Escuchar peticiones.
app.listen( process.env.PORT, () => {
    console.log( `Servidor corriendo en puerto ${ process.env.PORT }` );
});