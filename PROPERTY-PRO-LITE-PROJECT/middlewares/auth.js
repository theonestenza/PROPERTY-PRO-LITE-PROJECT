import jwt from 'jsonwebtoken';
import config from 'config';

function auth(req, res,next){
    const token = req.header('x-auth-token');
 if(!token) return res.status(401).send({'status':'error','error':'Access denied. No token provided'});
  
 try {
     const decoded = jwt.verify(token,config.get('jwtSecret'));
     req.user = decoded;
     next();
 } catch (error) {
     console.log(error);
   return res.status(400).send({'status':'error','error':error.message});
 }
}

export default auth;
