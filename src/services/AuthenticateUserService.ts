import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../repositories/UsersRepositories';
import {compare} from "bcryptjs"
import { sign} from "jsonwebtoken"


interface IAuthenticateRequest{
    email: string;
    password: string;
}


class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UserRepositories);

        // Verificar se email existe
        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error ("Email/Password incorrect")
        }

        // Verificar se a senha está correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error ("Email/Password incorrect")
        }
        // Gerar o token
        const token = sign({
            email: user.email
        },"5fc9d41a1c44dd6792317032a5f0a117",{
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }
}

export {AuthenticateUserService}