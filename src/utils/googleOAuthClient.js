// import { env } from "./env.js";
// import path from 'node:path';
// import {readFile} from 'fs/promises';


// const PATH_JSON=path.join(process.cwd(), 'config', 'google-oauth.json');
// const oauthConfig=JSON.parse(await readFile(PATH_JSON));
// export const googleOAuthClient=new OAuth2Client({
//     clientId:env('GOOGLE_AUTH_CLIENT_ID'),
//     clientSecret:env('GOOGLE_AUTH_CLIENT_SECRET'),
//     redirectUri:oauthConfig.web.redirect_uris[0],
// });

// export const generateAuthUrl=()=>{
//     googleOAuthClient.generateAuthUrl({
//         scope:[
//             'https://www.googleapis.com/auth/userinfo.email',
//             'https://www.googleapis.com/auth/userinfo.profile'
//         ],
//     });

// }
