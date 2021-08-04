import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateAvatar = new UpdateUserAvatarService();

        // @ts-ignore
        const user = await updateAvatar.execute({
            user_id: request.user.id,
            // @ts-ignore
            avatarFilename: request.file.filename,
        });

        return response.json(classToClass(user));
    }
}
