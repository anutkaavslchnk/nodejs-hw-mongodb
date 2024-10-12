import { SORT } from "../constants/constants.js";
import { contactsModel } from "../db/models/contacts.js";
import { calculateDataPagination } from "../utils/calculateDataPagination.js";

export const getAllContacts = async ({
    perPage = 10,
    page = 1,
    sortOrder = SORT.ASC,
    sortBy = 'name',
    filter = {},
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;


    if (!filter.userId) {
        throw new Error("User ID is required to fetch contacts.");
    }

    const queryContacts = contactsModel.find(filter);

    if (typeof filter.isFavourite === 'boolean') {
        queryContacts.where('isFavourite').equals(filter.isFavourite);
    }


    if (filter.type) {
        queryContacts.where('contactType').equals(filter.type);
    }

    const [contactsCount, contacts] = await Promise.all([
        contactsModel.find(filter)
            .merge(queryContacts)
            .countDocuments(),
        queryContacts
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec(),
    ]);

    const paginationData = calculateDataPagination(contactsCount, perPage, page);

    return {
      data:contacts,
        ...paginationData,
    };
};


export const getContactById=async(contactId,userId)=>{
    const contact=await contactsModel.findOne({_id:contactId, userId});
    return contact;
};


export const createContact = async ({ body, userId, photo }) => {
    const contact = await contactsModel.create({ ...body, userId, photo });
    console.log("Creating contact with userId:", userId);
    return contact;
};


export const deleteContact=async(contactId,userId)=>{

    const contact=await contactsModel.findOneAndDelete({
        _id:contactId,
        userId,
    });
    return contact;
};
export const patchContact=async(contactId, userId, payload, options={})=>{
    const rawResult=await contactsModel.findOneAndUpdate({ _id: contactId, userId }, payload,
        {
            new:true,
            ...options,
        });
    if(!rawResult) return null;
    return rawResult;
};
