import { ONE_DAY } from "../constants/constants.js";
import {  loginUser, logOutUser, refreshUsersSession, registerUser, requestResetEmail, resetPassword } from "../services/auth.js"

// import { generateAuthUrl } from "../utils/googleOAuthClient.js";

export const registerUserController = async (req, res) => {

        const user = await registerUser(req.body);


        res.status(201).json({
            status: 201,
            message: "Successfully registered a user!",
            data: user,
        });


};

export const loginUserController=async(req, res)=>{

    const session = await loginUser(req.body);
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
      });
      res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
      });
     res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {
          accessToken: session.accessToken,
        },
      })
};
export const logOutUserController=async(req,res)=>{
    const { sessionId } = req.cookies;
    if (!sessionId) {
        return res.status(400).json({
          status: 400,
          message: "Session ID is missing in cookies",
        });
      }
if(sessionId){
    await logOutUser(sessionId);
}
res.clearCookie('sessionId');
res.clearCookie('refreshToken');
res.status(204).send();
};



const setupSession=(res, session)=>{
    res.cookie('refreshToken', session.refreshToken,{
        httpOnly:true,
        expires:new Date(Date.now()+ONE_DAY)
    });
    res.cookie('sessionId', session._id,{
        httpOnly:true,
        expires:new Date(Date.now()+ONE_DAY)
    });
};

export const refreshUserSessionController=async(req,res)=>{
    const session=await refreshUsersSession({
        sessionId:req.cookies.sessionId,
        refreshToken:req.cookies.refreshToken,
    });
    setupSession(res, session);
    res.json({
        status:200,
        message:'Successfully refreshed a session!',
        data:{
            accessToken:session.accessToken,
        },
    });
};

export const requestResetEmailController=async(res, req)=>{
    await requestResetEmail(req.body.email);
    res.json({
        status:200,
        message:'Reset password email was successfully sent!',
        data:{},
    })
}
export const resetPasswordController=async(req,res)=>{
    await resetPassword(req.body);
    res.json({
        message:"Password was successfully reset!",
        status:200,
        data:{},
    })
}

// export const getGoogleAuthUrlController=async(req,res)=>{
//     const url=generateAuthUrl();
//     refreshUserSessionController.json({
//         status:200,
//         message:'Successfully get Google OAuth url!',
//         data:{
//             url,
//         },
//     });
// };


// export const loginWithGoogleController=async(req,res)=>{
//     const session=await loginOrSignupWithGoogle(req.body.code);
//     setupSession(res.session);
//     res.json({
//         status:200,
//         message:'Successfully logged in via Google OAuth!',
//         data:{
//             accessToken:session.accessToken,
//         }
//     })
// }
