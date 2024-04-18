const { usuariosModelo } = require('../dao/models/usuarios.modelo');

class usuariosManager{

    async create(usuario){
        let nuevoUsuario=await usuariosModelo.create(usuario)
        return nuevoUsuario.toJSON()
    }

    async getBy(filtro){   
        return await usuariosModelo.findOne(filtro).lean()
    }
}

module.exports = usuariosManager