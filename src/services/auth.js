import createHttpError from "http-errors";
import { UserCollection } from "../db/models/user.js"
import bcrypt from 'bcrypt';
import { SessionCollection } from "../db/models/session.js";
import { FIFTEEN_MINUTES, ONE_DAY, SMTP, TEMPLATES_DIR } from "../constants/constants.js";
import { randomBytes } from 'crypto';
import mongoose from "mongoose";
import { env } from "../utils/env.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from 'jsonwebtoken';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';
import path from 'node:path';

export const registerUser=async(payload)=>{

const user=await UserCollection.findOne({email:payload.email});

if(user) throw createHttpError(409, 'Email in use');

const encryptedPassword=await bcrypt.hash(payload.password, 10);

const newUser = await UserCollection.create({
    ...payload,
    password: encryptedPassword,
});

const { password, ...userData } = newUser.toObject();
return userData;
}

export const loginUser=async(payload)=>{
const user=await UserCollection.findOne({email:payload.email});
if(!user|| !user._id){
    throw createHttpError(404, 'User not found');
};

const isEqual=await bcrypt.compare(payload.password, user.password);
if(!isEqual){
throw createHttpError(401, 'Unauthorized');
}
await SessionCollection.deleteMany({userId:user._id});

const accessToken = randomBytes(30).toString('base64');
const refreshToken = randomBytes(30).toString('base64');

return await SessionCollection.create({
    userId:user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now()+FIFTEEN_MINUTES),
    refreshTokenValidUntil:new Date(Date.now()+ONE_DAY),
});

}

export const logOutUser=async(sessionId)=>{

    await SessionCollection.deleteOne({_id:sessionId});
}




export const createSession = () => {
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    return {
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
      refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
    };
  };





export const refreshUsersSession=async({sessionId, refreshToken})=>{
const session= await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
});

if(!session){
    throw createHttpError(401, 'Session is not found');
};

const isSessionTokenExpired=new Date()>new Date(session.refreshTokenValidUntil);


if(isSessionTokenExpired){
    throw createHttpError(401, 'Session token expired');
};

const newSession=createSession();

await SessionCollection.deleteOne({_id:sessionId, refreshToken});

return await SessionCollection.create({
    userId:session.userId,
    ...newSession
})
}

export const requestResetEmail=async(email)=>{
    const user = await UserCollection.findOne({ email });
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    const resetToken = jwt.sign(
      {
        sub: user._id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '15m',
      },
    );
    const resetPasswordTemplatePath = path.join(
      TEMPLATES_DIR,
      'reset-password-email.html',
    );

    const templateSource = (
      await fs.readFile(resetPasswordTemplatePath)
    ).toString();

    const template = handlebars.compile(templateSource);
    const html = template({
      name: user.name,
      link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
    });

    await sendEmail({
      from: env(SMTP.SMTP_FROM),
      to: email,
      subject: 'Reset your password',
      html,
    });

}


export const resetPassword=async(payload)=>{
  let entries;
  try{
entries=jwt.verify(payload.token, env('JWT_SECRET'));
  }catch(err){
if(err instanceof Error)
  throw createHttpError(401, err.message);
throw err;
  }

  const user=await UserCollection.findOne({
    email:entries.email,
    _id:entries.sub,
  });
if(!user){
  throw createHttpError(404, 'User not found');
}

const encryptedPassword=await bcrypt.hash(payload.password, 10);
await UserCollection.updateOne(
  {
    _id:user._id
  },
  {
    password:encryptedPassword
  }
)
}

// export const loginOrSignupWithGoogle = async (code) => {
//   const loginTicket = await validateCode(code);
//   const payload = loginTicket.getPayload();
//   if (!payload) throw createHttpError(401);

//   let user = await UserCollection.findOne({
//     email: payload.email,
//   });

//   if (!user) {
//     const password = await bcrypt.hash(randomBytes(10), 10);
//     user = await UserCollection.create({
//       email: payload.email,
//       name: getFullNameFromGoogleTokenPayload(payload),
//       password,
//     });
//   }

//   const newSession = createSession();


//   return await SessionCollection.create({
//     userId: user._id,
//     ...newSession,
//   });
// };
