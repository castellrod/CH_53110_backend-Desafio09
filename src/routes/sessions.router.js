const Router = require('express').Router;
const UsuariosManager = require('../managers/UsuariosManager.js');
const { creaHash } = require('../utils.js');

const  usersRouter= Router();

let usuariosManager=new UsuariosManager()

usersRouter.post('/registro',async(req,res)=>{

    let {first_name,last_name, age, email, password} =req.body
    if(!first_name || !last_name || !age || !email || !password){
        return res.redirect("/registro?error=Faltan datos")
    }

    let existe=await usuariosManager.getBy({email})
    if(existe){
        return res.redirect(`/registro?error=Ya existen usuarios con email ${email}`)

    }
    password=creaHash(password)

    try {
        let nuevoUsuario=await usuariosManager.create({first_name, last_name, age, email, password})


        return res.redirect(`/registro?mensaje=Registro exitoso para ${first_name}`)

    } catch (error) {
        return res.redirect(`/registro?error=Error 500 - error inesperado`)
        
    }


})

usersRouter.post('/login',async(req,res)=>{

    let {email, password} =req.body
    if(!email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Faltan datos`})
    }

    let usuario=await usuariosManager.getBy({email})
    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales incorrectas`})
    }

    if(usuario.password!==creaHash(password)){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales incorrectas`})
    }

    usuario={...usuario}
    delete usuario.password
    req.session.usuario=usuario

    res.setHeader('Content-Type','application/json')
    res.status(200).json({
        message:"Login correcto", usuario
    })
})


usersRouter.get('/logout',(req,res)=>{

    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${e.message}`
                }
            )
            
        }
    })
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        message:"Logout exitoso"
    });
});

module.exports = usersRouter;