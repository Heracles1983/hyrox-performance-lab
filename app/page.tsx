import App from "./rox-app";
import {getChatGPTUser} from "./chatgpt-auth";
export const dynamic="force-dynamic";
export default async function Home(){
 const user=await getChatGPTUser();
 return <App initialUser={user?{displayName:user.displayName,email:user.email}:null}/>;
}
