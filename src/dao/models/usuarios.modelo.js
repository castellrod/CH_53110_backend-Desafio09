const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email:{
        type: String, unique:true
    }, 
    age: Number,
    password: String,
    rango: {
        type: String,
        default: 'user'
    }
});

const usuariosModelo = mongoose.model('usuarios', usuariosSchema);

module.exports = { usuariosModelo };