import type {Audit} from "./rox";
export const elapsed=(s:{base:number;started:number|null},now=Date.now())=>s.base+(s.started?Math.max(0,now-s.started)/1000:0);
export function tally(log:Audit[]){const cancelled=new Set(log.filter(x=>x.type==="undo").map(x=>x.targetId));const active=log.filter(x=>x.type!=="undo"&&!cancelled.has(x.id));return {cancelled,active,count:active.filter(x=>x.type==="valid").reduce((n,x)=>n+x.amount,0),bad:active.filter(x=>x.type==="invalid").length,penalty:active.filter(x=>x.type==="penalty").reduce((n,x)=>n+x.amount,0)};}
