//userId - string, required
// accessToken - string, required
// refreshToken - string, required
// accessTokenValidUntil - Date, required
// refreshTokenValidUntil - Date, required


import { model, Schema } from "mongoose";

const Session=new Schema({
    userId:{type:Schema.Types.ObjectId, ref:'users', required:true },
accessToken:{type:String, required:true},
refreshToken:{type:String, required:true},
accessTokenValidUntil:{type:Date, required:true},
refreshTokenValidUntil:{type:Date, required:true},
},
{timestamps:true, versionKey:false},

);
export const SessionCollection=model('sessions', Session);
