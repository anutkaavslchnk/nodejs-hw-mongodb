import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { PORT_VAR } from './constants/constants.js';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(env(PORT_VAR.PORT), '3000');

export const setupServer = () => {
    const app = express();


    app.use(express.json());
    app.use(cors());
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );


    app.get('/contacts', async (req, res) => {
        try {
            const contacts = await getAllContacts();
            res.status(200).json({
                status: 200,
                message: "Successfully fetched all contacts!",
                data:  contacts ,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error fetching contacts',
                error: err.message,
            });
        }
    });


    app.get('/contacts/:contactId', async (req, res) => {
        const { contactId } = req.params;
        try {
            const contact = await getContactById(contactId);
            if (!contact) {
                return res.status(404).json({
                    message: 'Contact not found',
                });
            }
            res.status(200).json({
                status: 200,
                message: `Successfully found contact with id ${contactId}!`,
                data: { contact },
            });
        } catch (err) {
            res.status(500).json({
                message: 'Error fetching contact',
                error: err.message,
            });
        }
    });


    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Not found',
        });
    });


    app.use((req, res, next, err) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message,
        });
    });


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
