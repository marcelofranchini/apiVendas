import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(user_id);

        const storageProvider = new DiskStorageProvider();

        if (!user) {
            throw new AppError('User not found.');
        }

        if (uploadConfig.driver === 's3') {
            const s3Provider = new S3StorageProvider();
            if (user.avatar) {
                await s3Provider.deleteFile(user.avatar);
            }
            const filename = await s3Provider.saveFile(avatarFilename); //salva o caminho do avatar no db

            user.avatar = filename;
        } else {
            const diskProvider = new DiskStorageProvider();
            if (user.avatar) {
                await diskProvider.deleteFile(user.avatar);
            }
            const filename = await diskProvider.saveFile(avatarFilename);
            user.avatar = filename; //salva o caminho do avatar no db
        }

        if (user.avatar) {
            await storageProvider.deleteFile(user.avatar); //deleta o avatar caso já tenha
        }

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
