import {env} from "cloudflare:workers";
export function database(){if(!env.DB)throw Error("Records unavailable");return env.DB;}
