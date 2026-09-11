"use client";
import {ReactNode} from "react";
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from "@/components/ui/select";
import {Empty,EmptyHeader,EmptyTitle,EmptyDescription,EmptyMedia} from "@/components/ui/empty";
import {Inbox,ExternalLink} from "lucide-react";
export {Button} from "@/components/ui/button";
export function Pick({value,onChange,options,label,disabled=false}:{value:string;onChange:(v:string)=>void;options:(string|{value:string;label:string})[];label:string;disabled?:boolean}){return <Select value={value} onValueChange={onChange} disabled={disabled}><SelectTrigger aria-label={label} className="pick"><SelectValue/></SelectTrigger><SelectContent position="popper">{options.map(o=>{const v=typeof o==="string"?o:o.value;return <SelectItem key={v} value={v}>{typeof o==="string"?o:o.label}</SelectItem>})}</SelectContent></Select>}
export function Field({label,children,hint}:{label:string;children:ReactNode;hint?:string}){return <label className="field"><span>{label}</span>{children}{hint&&<small>{hint}</small>}</label>}
export function Panel({title,eyebrow,action,children,className=""}:{title?:string;eyebrow?:string;action?:ReactNode;children:ReactNode;className?:string}){return <section className={`panel ${className}`}>{(title||action)&&<div className="panel-head"><div>{eyebrow&&<div className="eyebrow">{eyebrow}</div>}<h2>{title}</h2></div>{action}</div>}{children}</section>}
export function EmptyBox({title,text,action}:{title:string;text:string;action?:ReactNode}){return <Empty className="empty-box"><EmptyHeader><EmptyMedia variant="icon"><Inbox/></EmptyMedia><EmptyTitle>{title}</EmptyTitle><EmptyDescription>{text}</EmptyDescription></EmptyHeader>{action}</Empty>}
export function External({href,children}:{href:string;children:ReactNode}){return <a href={href} target="_blank" rel="noopener noreferrer" className="external">{children}<ExternalLink size={14}/></a>}
export function Stat({label,value,detail,accent=false}:{label:string;value:ReactNode;detail:ReactNode;accent?:boolean}){return <div className={`stat ${accent?"accent-stat":""}`}><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>}
