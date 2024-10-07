import { SORT } from "../constants/constants.js";
import { contactsModel } from "../db/models/contacts.js";
import { calculateDataPagination } from "../utils/calculateDataPagination.js";

export const getAllContacts=async({perPage=10, page=1, sortOrder=SORT.ASC, sortBy='name', filter={},})=>{
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const queryContacts=contactsModel.find();

if(typeof filter.isFavourite === 'boolean'){
    queryContacts.where('isFavourite').equals(filter.isFavourite);
};

if(filter.type){
    queryContacts.where('contactType').equals(filter.type);
};

    const [contactsCount, contacts]=await Promise.all([

        contactsModel.find()
        .merge(queryContacts)
        .countDocuments(),
        queryContacts
        .skip(skip)
        .limit(limit)
        .sort({[sortBy]:sortOrder})
        .exec(),
    ]);
    const paginationData = calculateDataPagination(contactsCount, perPage, page);

    return {
        data: contacts,
        ...paginationData,
    };
};
export const getContactById=async(contactId,userId)=>{
    const contact=await contactsModel.findOne({_id:contactId, userId});
    return contact;
};
export const createContact=async(req)=>{
   const {_id:userId}=req.user;
    const contact=await contactsModel.create(...req.body, userId );
    return contact;
}
export const deleteContact=async(contactId,userId)=>{

    const contact=await contactsModel.findOneAndDelete({
        _id:contactId,
        userId,
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
