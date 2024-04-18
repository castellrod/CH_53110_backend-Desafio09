const Router = require('express').Router;
const { session } = require('passport');
const UserManager = require('../managers/userManager');
const sessionRouter = Router();
const passport = require('passport');
let userManager = new UserManager();



sessionRouter.get('/', async (req, res) => {
    try {
        const users = await userManager.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


sessionRouter.get("/registerError", (req, res) => {
    res.redirect("/register?message=Error en registro");
    });

    sessionRouter.post(
    "/register",
    passport.authenticate("register", {
        failureRedirect: "/api/sessions/registerError",
    }),
    async (req, res) => {
    return res.redirect("/register?message=¡Registro correcto!");
    }
);

    sessionRouter.get("/loginError", (req, res) => {
    res.redirect("/login?error=Error en login");
    });

    sessionRouter.post("/login", passport.authenticate("login", {failureRedirect: "/api/sessions/loginError",}), (req, res) => {
    let user=req.user
    user={...user}
    delete user.password
    req.session.user =user 

    res.redirect("/products");
});

    sessionRouter.get("/github", passport.authenticate("githubLogin", {}), (req, res)=>{

});

    sessionRouter.get("/githubError", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    return res.status(500).json({
    error: "Error en servidor",
    detalle: "Error en login con Github"
    })
});

    sessionRouter.get("/githubCallback", passport.authenticate("githubLogin", {failureRedirect:"api/sessions/githubError"}), (req, res) => {
    req.session.user = req.user;
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({payload: "Login successful", user: req.user});
});

sessionRouter.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            res.status(500).send('Error al cerrar sesión.');
        } else {
            res.redirect('/login'); 
        }
    });
});


module.exports = sessionRouter;