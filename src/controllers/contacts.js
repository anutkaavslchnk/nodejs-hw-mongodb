import { createContact, deleteContact, getAllContacts, getContactById, patchContact } from "../services/contacts.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
export const getContactsController = async (req, res, next) => {
    const { page, perPage } = parsePaginationParams(req.query);
const {sortOrder, sortBy}=parseSortParams(req.query);
const filter=parseFilterParams(req.query);

    try {
        const contacts = await getAllContacts({ page, perPage, sortOrder, sortBy, filter, });
        res.status(200).json({
            status: 200,
            message: "Successfully fetched all contacts!",
            data: contacts,
        });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        next(error);
    }
};


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


export const deleteContactController=async(req, res, next)=>{
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

        if (!contact) {
            return next(createHttpError(404, 'Contact not found'));
        }

        res.json({
            status: 200,
            message: "Successfully patched a contact!",
            data: contact,
        });

};
