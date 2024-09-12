import { contactsModel } from "../db/models/contacts.js";

export const getAllContacts=async()=>{
    try {
        const contacts = await contactsModel.find();
        return contacts;
    } catch (error) {
        throw new Error('Failed to fetch contacts');
    }
};
export const getContactById=async(contactId)=>{
    const contact=await contactsModel.findById(contactId);
    return contact;
};
