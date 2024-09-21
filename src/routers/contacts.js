import {Router} from 'express';


import {
    getContactsController,
    getContactsByIdController,
    createStudentsController,
    deleteContactController,
    patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router=Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));
router.post('/contacts', ctrlWrapper(createStudentsController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));
export default router;
