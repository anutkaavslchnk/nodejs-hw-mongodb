import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { PORT_VAR } from './constants/constants.js';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
const PORT = Number(env(PORT_VAR.PORT), '3000');

export const setupServer = () => {
    const app = express();


    app.use(express.json({
        type:['application/json',
            'application/vnd.api+json'
        ],
    }));
    app.use(cors());
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

app.use(contactsRouter);



app.use('*', notFoundHandler);
app.use(errorHandler);


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
