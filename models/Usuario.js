const { Schema, model } = require( 'mongoose' );


const UserSchema = Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }

});

// UserSchema.method( 'toJSON', function() {
    
//     const { _id, __v, ...object } = this.toObject();

//     object.uid = _id;
//     return object;
// });

module.exports = model( 'User', UserSchema );