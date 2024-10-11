export const PORT_VAR={
    PORT:"PORT",
};
export const BD_VARS={
    MONGODB_USER:'MONGODB_USER',
    MONGODB_PASSWORD:'MONGODB_PASSWORD',
    MONGODB_URL:'MONGODB_URL',
    MONGODB_DB:'MONGODB_DB',
};

export const SORT={
    ASC:'asc',
    DESC:'desc',
};

export const FIFTEEN_MINUTES=15*60*1000;
export const ONE_DAY=24*60*60*1000;

export const SMTP={
    SMTP_HOST:'SMTP_HOST',
    SMTP_PORT:'SMTP_PORT',
    SMTP_USER:'SMTP_USER',
    SMTP_PASSWORD:'SMTP_PASSWORD',
    SMTP_FROM:'SMTP_FROM',
    JWT_SECRET:'JWT_SECRET',
};

import path from 'node:path';
export const TEMPLATES_DIR=path.join(process.cwd(), 'src', 'templates');
