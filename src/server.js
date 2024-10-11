import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { PORT_VAR } from './constants/constants.js';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { requestResetEmail } from './services/auth.js';

const PORT = Number(env(PORT_VAR.PORT), '3000');

export const setupServer = () => {
    const app = express();


    app.use(express.json({
        type:['application/json',
            'application/vnd.api+json'
        ],
    }));
    app.use(cors());
    app.use(cookieParser())
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.post('/auth/send-reset-email', async (req, res) => {

        try {
            const { email } = req.body; 
            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }

            await requestResetEmail(email);
            res.status(200).json({ message: "Reset email sent" });
        } catch (error) {
            console.error("Error details:", error);
            res.status(500).json({ message: "Something went wrong", error: error.message });
        }
    });
app.use(router);



app.use('*', notFoundHandler);
app.use(errorHandler);


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
