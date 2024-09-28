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
const router=Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactsByIdController));
router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createStudentsController));
router.delete('/contacts/:contactId',isValidId, ctrlWrapper(deleteContactController));
router.patch('/contacts/:contactId', validateBody(updatedContactSchema), ctrlWrapper(patchContactController));
export default router;
