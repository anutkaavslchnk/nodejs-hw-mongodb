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
export const createContact=async(payload)=>{
    const contact=await contactsModel.create(payload);
    return contact;
}
export const deleteContact=async(contactId)=>{
    const contact=await contactsModel.findOneAndDelete({
        _id:contactId,
    });
    return contact;
};
export const patchContact=async(contactId, payload, options={})=>{
    const rawResult=await contactsModel.findOneAndUpdate({ _id: contactId }, payload,
        {
            new:true,
            ...options,
        });
    if(!rawResult) return null;
    return rawResult;
};
