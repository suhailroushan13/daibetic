import { useId, useState } from 'react';
type Mode = 'Healthy' | 'Type 1' | 'Type 2';
const nodes = [
  {name:'Digestion',short:'Food becomes fuel',x:310,y:74,description:'Digestible carbohydrates are broken into simple sugars. Glucose crosses the small intestine into the portal blood, which reaches the liver first.'},
  {name:'Bloodstream',short:'The transport network',x:365,y:178,description:'Blood distributes glucose to tissues. Concentration reflects glucose arriving from food and the liver, balanced against tissue use and storage.'},
  {name:'Pancreas',short:'Sense & signal',x:302,y:264,description:'Beta cells in pancreatic islets couple glucose metabolism to insulin secretion. Nearby alpha cells release glucagon, especially when fasting.'},
  {name:'Liver',short:'Store & release',x:221,y:227,description:'The liver stores glycogen after meals and supplies glucose during fasting. Insulin suppresses liver glucose production; glucagon promotes it.'},
  {name:'Muscle & fat',short:'Use & store energy',x:350,y:347,description:'Insulin helps move GLUT4 transporters to muscle and fat-cell surfaces. Muscle uses glucose for work and stores glycogen; fat tissue also stores energy as triglycerides.'},
] as const;
const states:Record<Mode,{label:string;summary:string}>={
 Healthy:{label:'A responsive feedback loop',summary:'Insulin secretion and tissue responses work together to keep glucose within a regulated range.'},
 'Type 1':{label:'The insulin signal is deficient',summary:'Autoimmune beta-cell loss reduces insulin supply. Insulin replacement is essential; the rest of the pancreas still has other functions.'},
 'Type 2':{label:'Response and capacity change',summary:'Muscle, liver, and fat respond less effectively to insulin. Beta-cell output eventually becomes insufficient for the body’s needs.'},
};
export default function GlucoseJourney({compact=false}:{compact?:boolean}){
  const [mode,setMode]=useState<Mode>('Healthy');const [selected,setSelected]=useState(2);const id=useId();
  return <figure className={`glucose-journey ${compact?'journey-compact':''}`} aria-label="Interactive glucose journey">
    <div className="diagram-top"><span className="eyebrow"><span className="tiny-dot"/> INSIDE THE SYSTEM</span><span className="diagram-number">FIG. 01</span></div>
    <div className="mode-switch" role="group" aria-label="Biological system mode">{(Object.keys(states) as Mode[]).map(m=><button key={m} aria-pressed={mode===m} onClick={()=>setMode(m)}>{m}</button>)}</div>
    <svg viewBox="0 0 540 432" role="img" aria-labelledby={`${id}-title ${id}-description`} className="body-diagram">
      <title id={`${id}-title`}>Glucose regulation: {mode}</title><desc id={`${id}-description`}>Conceptual anatomy, not to scale. Food is digested; glucose enters blood; pancreatic insulin influences liver, muscle, and fat. {states[mode].summary}</desc>
      <defs><pattern id={`${id}-grid`} width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".65" fill="currentColor" opacity=".13"/></pattern><linearGradient id={`${id}-body`} x1="0" x2="1"><stop stopColor="#dee8fd" stopOpacity=".55"/><stop offset="1" stopColor="#eff3fb" stopOpacity=".2"/></linearGradient></defs>
      <rect width="540" height="432" fill={`url(#${id}-grid)`}/>
      <ellipse cx="277" cy="396" rx="97" ry="9" fill="var(--accent)" opacity=".045"/>
      <g transform="translate(20,0)" fill={`url(#${id}-body)`} stroke="var(--anatomy-line)" strokeWidth="1.4">
        <path d="M234 88c-14-7-22-19-22-36 0-21 16-35 35-35s36 14 36 35c0 17-8 29-22 36l1 21 42 14c14 5 24 15 30 34l30 99c3 11-9 19-15 8l-37-90-8 72 9 128c1 19-20 23-24 4l-17-106h-16l-14 106c-3 19-25 15-24-4l7-128-7-72-31 90c-5 12-19 5-16-7l27-100c5-20 17-30 32-35l32-13Z"/>
        <path d="M236 112v36m25-36v36M248 137v66M247 144c-24-18-43 18-35 48 4 14 24 14 28 4M257 144c24-18 40 18 32 48-4 14-22 14-25 4" fill="none" opacity=".6"/>
      </g>
      <path d="M274 88v75c0 12 19 12 23 24 6 18-12 30-28 19" stroke="var(--accent)" strokeWidth="2" fill="none" opacity=".55"/>
      <path d="M219 208c14-9 30-7 45-3l24 10c-5 13-12 21-26 22l-39-7c-8-3-9-12-4-22Z" fill="#7195da" fillOpacity=".19" stroke="#7195da" strokeWidth="1.4"/>
      <path d="M250 250c17-9 35-10 52-3 9 4 4 12-3 11l-47 2c-8 0-8-7-2-10Z" fill={mode==='Type 1'?'#c98765':'#e5b971'} fillOpacity=".6" stroke="#b48842" strokeWidth="1.3"/>
      <path d="M247 274c-19-4-27 6-16 14l51 2c20 0 18 14 0 14l-49-1c-17 0-19 14-1 16l48 1c17 0 18 13-1 14l-41-1" stroke="var(--anatomy-line)" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".4"/>
      <g stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeDasharray={mode==='Healthy'?'3 5':'2 7'} opacity=".5"><path d="M298 259c49-11 61-40 31-68M299 260c42 18 39 55 46 91M249 255c-31 0-39-9-34-25" className={mode==='Type 1'?'':'flow-path'}/></g>
      {[{x:330,y:210},{x:340,y:308},{x:312,y:173},{x:322,y:282}].map((p,i)=><g key={i} transform={`translate(${p.x},${p.y})`} fill="var(--accent)" opacity=".6"><path d="m0-4 4 2v4L0 4-4 2v-4Z"/></g>)}
      {nodes.map((n,i)=><g key={n.name}>
        <path d={i<3?`M${n.x} ${n.y}H${i===0?383:408}`:`M${n.x} ${n.y}H${i===3?130:426}`} fill="none" stroke="var(--anatomy-line)" strokeWidth="1"/>
        <circle cx={n.x} cy={n.y} r={selected===i?8:5} fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5"/>
        {selected===i && <circle cx={n.x} cy={n.y} r="3" fill="var(--accent)"/>}
        <text x={i===3?35:i===0?386:411} y={n.y-7} fontSize="11" fill="var(--text)" fontWeight="600">{n.name}</text><text x={i===3?35:i===0?386:411} y={n.y+9} fontSize="9" fill="var(--muted)">{n.short}</text>
      </g>)}
      <text x="31" y="388" fontSize="9" fill="var(--muted)" letterSpacing="1.3">GLUCOSE → SIGNAL → RESPONSE</text>
      <circle cx="32" cy="408" r="3" fill="var(--accent)"/><text x="42" y="411" fontSize="9" fill="var(--muted)">Glucose pathway</text><circle cx="154" cy="408" r="3" fill="#b48842"/><text x="164" y="411" fontSize="9" fill="var(--muted)">Pancreatic islets</text>
    </svg>
    <div className="organ-controls" role="group" aria-label="Explore an organ">{nodes.map((n,i)=><button key={n.name} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{n.name}</button>)}</div>
    <div className="diagram-explanation" aria-live="polite"><strong>{mode==='Healthy' ? nodes[selected].name:states[mode].label}</strong><p>{mode==='Healthy'?nodes[selected].description:states[mode].summary}</p></div>
    <figcaption>Conceptual illustration · not a clinical simulation. <a href="/fundamentals/homeostasis">Explore the biology →</a></figcaption>
  </figure>;
}
