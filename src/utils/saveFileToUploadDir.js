import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/constants.js';
import { env } from './env.js';

export const saveFileToUploadDir = async (file) => {
    const newFilePath = path.join(UPLOAD_DIR, file.filename);
    await fs.rename(path.join(TEMP_UPLOAD_DIR, file.filename), newFilePath);

    return `${env('APP_DOMAIN')}/uploads/${file.filename}`;
};

