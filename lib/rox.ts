export const DIVISIONS=["男子公开组","女子公开组","男子专业组","女子专业组","男子双人组","女子双人组","混合双人组"];
export const STATIONS=[
 {id:"ski",name:"滑雪机",en:"SKI ERG",target:1000,unit:"米",step:100},
 {id:"push",name:"雪橇推",en:"SLED PUSH",target:50,unit:"米",step:12.5},
 {id:"pull",name:"雪橇拉",en:"SLED PULL",target:50,unit:"米",step:12.5},
 {id:"burpee",name:"波比跳远",en:"BURPEE BROAD JUMP",target:80,unit:"米",step:5},
 {id:"row",name:"划船机",en:"ROWING",target:1000,unit:"米",step:100},
 {id:"carry",name:"农夫行走",en:"FARMERS CARRY",target:200,unit:"米",step:25},
 {id:"lunge",name:"沙袋弓步",en:"SANDBAG LUNGES",target:100,unit:"米",step:10},
 {id:"wall",name:"墙球",en:"WALL BALLS",target:100,unit:"次",step:1}
];
export type Segment={id:string;name:string;type:"run"|"station"|"zone";target?:number};
export type Split=Segment&{seconds:number;end:number};
export type Audit={id:string;type:"valid"|"invalid"|"penalty"|"undo";amount:number;reason:string;at:number;targetId?:string};
export type RecordItem={id:string;date:string;name:string;mode:"full"|"single"|"race"|"judge";division:string;station:string;athlete:string;load:string;target:number;count:number;seconds:number;penalty:number;splits:Split[];audit:Audit[];complete:boolean;rpe:number;notes:string;source:string};
export type Plan={id:string;date:string;title:string;kind:"训练"|"比赛"|"恢复";minutes:number;notes:string;done:boolean;source?:string};
export type Goal={id:string;title:string;date:string;division:string;seconds:number;run:number;stations:number[];zone:number;checklist:string[]};
export type Benchmark={id:string;name:string;date:string;division:string;source:string;seconds:number;splits:{[key:string]:number};notes:string};
export type Data={records:RecordItem[];plans:Plan[];benchmarks:Benchmark[];goal:Goal|null};
export const EMPTY:Data={records:[],plans:[],benchmarks:[],goal:null};
export const DEFAULT_GOAL:Goal={id:"current",title:"我的下一场 HYROX",date:"",division:DIVISIONS[0],seconds:5400,run:330,stations:[270,210,240,330,270,150,300,330],zone:300,checklist:[]};
export const fmt=(v:number,h=false)=>{const s=Math.max(0,Math.floor(v||0)),hours=Math.floor(s/3600);return (hours||h?String(hours).padStart(2,"0")+":":"")+String(hours||h?Math.floor(s%3600/60):Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")};
export const parse=(s:string)=>{if(!/^\d{1,3}:\d{2}(:\d{2})?$/.test(s))return NaN;const p=s.split(":").map(Number);return p.slice(1).some(v=>v>=60)?NaN:p.reduce((a,b)=>a*60+b,0)};
export const dateKey=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
export const dateOf=(s:string)=>new Date(s+"T12:00:00");
export const total=(r:RecordItem)=>r.seconds+r.penalty;
export function segments(mode:string,station:string):Segment[]{if(mode==="single"){const s=STATIONS.find(x=>x.id===station)!;return [{id:s.id,name:s.name,type:"station",target:s.target}]}return STATIONS.flatMap((s,i)=>[{id:`run-${i+1}`,name:`跑步 ${i+1}`,type:"run" as const,target:1000},{id:`in-${i+1}`,name:`进入第 ${i+1} 站`,type:"zone" as const},{id:s.id,name:s.name,type:"station" as const,target:s.target},...(i<7?[{id:`out-${i+1}`,name:`离开第 ${i+1} 站`,type:"zone" as const}]:[])]);}
export function metric(r:RecordItem,id:string){if(id==="total")return total(r);const a=r.splits.filter(x=>id==="run"?x.type==="run":id==="zone"?x.type==="zone":x.id===id);return a.length?a.reduce((s,x)=>s+x.seconds,0):null;}
export const comparable=(r:RecordItem)=>[r.athlete.trim().toLowerCase(),r.mode,r.division,r.station,r.target,r.load.trim().toLowerCase(),r.complete].join("|");
export const goalTotal=(g:Goal)=>g.run*8+g.stations.reduce((a,b)=>a+b,0)+g.zone;
export function sampleRecords():RecordItem[]{return [1.12,1.07,1.03,1].map((factor,i)=>{let end=0;const splits=segments("full","").map(s=>{const seconds=Math.round((s.type==="run"?330:s.type==="zone"?20:DEFAULT_GOAL.stations[STATIONS.findIndex(x=>x.id===s.id)])*factor);end+=seconds;return {...s,seconds,end};});const date=new Date();date.setDate(date.getDate()-21+i*7);return {id:`demo-${i}`,date:dateKey(date),name:`全程模拟 ${i+1}`,mode:"full",division:DIVISIONS[0],station:"",athlete:"示例运动员",load:"示例：公开组相同场地",target:100,count:100,seconds:end,penalty:0,splits,audit:[],complete:true,rpe:7,notes:"虚构数据，仅用于展示成绩分析。",source:"示例数据"}})}
export type Race={id:string;city:string;country:string;region:string;date:string;end:string;timezone:string;url:string};
const raceRows=[
 ["beijing","北京","中国","亚太","2026-09-10","2026-09-13","Asia/Shanghai"],
 ["maastricht","马斯特里赫特","荷兰","欧洲","2026-09-17","2026-09-20","Europe/Amsterdam"],
 ["rome","罗马","意大利","欧洲","2026-09-23","2026-09-27","Europe/Rome"],
 ["toronto","多伦多","加拿大","北美","2026-10-01","2026-10-04","America/Toronto"],
 ["boston","波士顿","美国","北美","2026-10-08","2026-10-11","America/New_York"],
 ["sao-paulo","圣保罗","巴西","南美","2026-10-17","2026-10-18","America/Sao_Paulo"],
 ["shanghai","上海","中国","亚太","2026-10-31","2026-11-01","Asia/Shanghai"],
 ["seoul","首尔","韩国","亚太","2026-11-13","2026-11-15","Asia/Seoul"],
 ["cairo","开罗","埃及","非洲","2026-11-14","2026-11-15","Africa/Cairo"],
 ["guangzhou","广州","中国","亚太","2026-11-21","2026-11-22","Asia/Shanghai"],
 ["singapore","新加坡","新加坡","亚太","2026-11-26","2026-11-29","Asia/Singapore"],
 ["johannesburg","约翰内斯堡","南非","非洲","2026-11-26","2026-11-29","Africa/Johannesburg"],
 ["london","伦敦","英国","欧洲","2026-12-02","2026-12-06","Europe/London"],
 ["sanya","三亚","中国","亚太","2026-12-05","2026-12-06","Asia/Shanghai"],
 ["melbourne","墨尔本","澳大利亚","亚太","2026-12-09","2026-12-13","Australia/Melbourne"],
 ["kuala-lumpur","吉隆坡","马来西亚","亚太","2026-12-10","2026-12-13","Asia/Kuala_Lumpur"],
 ["hong-kong","香港","中国","亚太","2027-01-07","2027-01-10","Asia/Hong_Kong"],
 ["osaka","大阪","日本","亚太","2027-01-21","2027-01-25","Asia/Tokyo"]
];
export const RACES:Race[]=raceRows.map(([id,city,country,region,date,end,timezone])=>({id,city,country,region,date,end,timezone,url:id==="shanghai"?"https://hyroxuk.com/event/hyrox-shanghai-1031/":"https://hyroxuk.com/find-my-race/"}));
export const CHECKED="2026-09-10";
export function download(name:string,data:string,type="application/json"){const url=URL.createObjectURL(new Blob([data],{type}));const a=document.createElement("a");a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}
