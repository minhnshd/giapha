
async function loadTree(){
 const res = await fetch("family.json")
 const data = await res.json()
 const tree = document.getElementById("tree")
 tree.appendChild(renderNode(data))
}

function renderNode(node){
 const container=document.createElement("div")
 container.className="node"

 let box
 if(node.couple){
   box=document.createElement("div")
   box.className="couple"
   box.appendChild(createPerson(node.couple.husband))
   box.appendChild(createPerson(node.couple.wife))
 }else{
   box=createPerson(node.person)
 }

 container.appendChild(box)

 if(node.children && node.children.length){
   const line=document.createElement("div")
   line.className="line"
   container.appendChild(line)

   const children=document.createElement("div")
   children.className="children"

   node.children.forEach(c=>children.appendChild(renderNode(c)))
   container.appendChild(children)
 }

 return container
}

function createPerson(p){
 const el=document.createElement("div")
 el.className="person"
 el.innerHTML=`<div>${p.name}</div>${p.branch?`<div class="branch">${p.branch}</div>`:""}`
 return el
}

loadTree()

const tree=document.getElementById("tree")
const viewport=document.getElementById("viewport")
let scale=1,x=0,y=0,drag=false,sx,sy

viewport.onmousedown=e=>{drag=true;sx=e.clientX-x;sy=e.clientY-y}
window.onmouseup=()=>drag=false
window.onmousemove=e=>{if(!drag)return;x=e.clientX-sx;y=e.clientY-sy;update()}
viewport.onwheel=e=>{e.preventDefault();scale+=e.deltaY>0?-0.1:0.1;if(scale<0.2)scale=0.2;if(scale>2)scale=2;update()}
function update(){tree.style.transform=`translate(${x}px,${y}px) scale(${scale})`}
