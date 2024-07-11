import jwt from 'jsonwebtoken'
import 'dotenv/config'

export function authenticateToken(req, res, next){
    try{
    //Obtener el token de las cabecera
    const authHeader = req.header('authorization')
    //Bearer
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null)
        return res.sendStatus(401)
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{

        if(err)
            return res.sendStatus(403)
        console.log('user', user)
        req.user = user;
        next();

    });
       } catch (error) {
        // Si hay un error, enviamos un mensaje
        res.status(401).json({ message: 'Usuario no autorizado' });
    };
}
