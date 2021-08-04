import uploadConfig from '@config/upload';
import fs from 'fs';
import path from 'path';

export default class DiskStorageProvider {
    public async saveFile(file: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.directory, file), // resolve concatena end - arquivo
        ); // rename transfere de uma pasta para a outra, da temp pra uploadas

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.directory, file); // pega o caminho + arquivo

        try {
            await fs.promises.stat(filePath); //verifica se existe
        } catch {
            return; // caso nao encontra mata a função
        }

        await fs.promises.unlink(filePath); // exclui
    }
}
