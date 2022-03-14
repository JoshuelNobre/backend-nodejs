import { Request, Response } from 'express';
import { ListUserReceiverComplementsService } from '../services/ListUserReceiverComplementsService';




class ListUserReceiverComplimentsController {
    async handle (request: Request, response: Response) {

        const {user_id} = request;

        const listUserReceiverComplimentsService = new ListUserReceiverComplementsService();

        const compliments = await listUserReceiverComplimentsService.execute(user_id)

        return response.json(compliments)
    }
}

export{ListUserReceiverComplimentsController}