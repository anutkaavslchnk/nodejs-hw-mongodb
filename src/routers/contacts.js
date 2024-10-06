import {Router} from 'express';


import {
    getContactsController,
    getContactsByIdController,
    createStudentsController,
    deleteContactController,
    patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updatedContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createUserSchema} from '../validation/auth.js';
import {registerUserController } from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';
const router=Router();

router.use(authenticate);
router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactsByIdController));
router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createStudentsController));
router.post('/register', validateBody(createUserSchema), ctrlWrapper(registerUserController));
router.delete('/contacts/:contactId',isValidId, ctrlWrapper(deleteContactController));
router.patch('/contacts/:contactId', validateBody(updatedContactSchema), ctrlWrapper(patchContactController));
export default router;
