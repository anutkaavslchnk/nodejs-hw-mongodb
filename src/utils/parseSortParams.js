import { SORT } from "../constants/constants.js";
const parseOrder=(sortOrder)=>{
    const isKnownOrder=[SORT.ASC, SORT.DESC].includes(sortOrder);

    if(isKnownOrder)return  sortOrder;
    return SORT.ASC;
};
const parseSortBy=(sortBy)=>{
const keysOfContact=[
    '_id',
    'name',
    'gender',
    'phoneNumber',
    'avgMark',
    'onDuty',
    'createdAt',
    'updatedAt',
];
if(keysOfContact.includes(sortBy)){
    return sortBy;
}
return '_id';
}
export const parseSortParams=(query)=>{
    const {sortBy, sortOrder}=query;
    const parsedSortBy=parseSortBy(sortBy);
    const parsedSortOrder=parseOrder(sortOrder);
    return{
        sortBy:parsedSortBy,
        sortOrder:parsedSortOrder,

    }
}
