import { createContact, deleteContact, getAllContacts, getContactById, patchContact } from "../services/contacts.js";
import createHttpError from "http-errors";
export const getContactsController=async (req, res, next)=>{

try {
    const contacts = await getAllContacts();
    res.status(200).json({
        status: 200,
        message: "Successfully fetched all contacts!",
        data:  contacts ,
    });
} catch (error) {;
    next(error)
}

}

export const getContactsByIdController=async (req, res, next)=>{
    const {contactId}=req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
throw createHttpError(404, 'Contact not found');
        return ;
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
}
export const createStudentsController=async(req,res)=>{
    const contact=await createContact(req.body);
    res.status(201).json({
        status:201,
        message:`Successfully created a contact!`,
        data:contact,
    });
};


export const deleteContactController=async(req, res)=>{
    const {contactId}=req.params;
    const contact=await deleteContact(contactId);
    if(!contact){
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    res.status(204).send();
};




export const patchContactController = async (req, res, next) => {
    const id = req.params.contactId;
    const { body } = req;


        const contact = await patchContact(id, body);

        if (!contact|| !contact.contact) {
            return next(createHttpError(404, 'Contact not found'));
        }

        res.json({
            status: 200,
            message: "Successfully patched a contact!",
            data: contact,
        });

};
