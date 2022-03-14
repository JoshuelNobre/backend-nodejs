import {Request, Response, NextFunction} from "express";
import {verify } from "jsonwebtoken"


interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

    // Receber o token
    const authToken = request.headers.authorization

    if (!authToken) {
        return response.status(401).end();
    }

    const [,token] = authToken.split(" ")

    try {
        const {sub} = verify(token, "5fc9d41a1c44dd6792317032a5f0a117") as IPayload;

        request.user_id = sub;
        return next();

    } catch(err){
        return response.status(401).end();
    }

    // Validar e o token está preenchido

    // Validar se o token é válido
    
    // Recuperar informações do usuário
}
