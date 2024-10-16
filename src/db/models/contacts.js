import { model, Schema } from "mongoose";

const schema=new Schema({
name:{
    type:String,
    required:true,
},
phoneNumber:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:false,
},
isFavourite:{
    type:Boolean,
    default: false,
},
contactType:{
    type:String,
    enum:['work', 'home', 'personal'],
    default:'personal',
},
},
{
    timestamps: true,
    versionKey: false,
}
);
export const contactsModel=model('contacts',schema);
