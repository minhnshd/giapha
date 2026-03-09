let zoomLevel=1
let familyData=null

fetch("family.json")
.then(res=>res.json())
.then(data=>{
familyData=data
renderTree(data)
})

function renderTree(data){

document.getElementById("tree").innerHTML=""

const width=2000
const height=1200

const svg=d3.select("#tree")
.append("svg")
.attr("width",width)
.attr("height",height)
.append("g")

const tree=d3.tree().size([height,width-400])

const root=d3.hierarchy(data)

tree(root)

svg.selectAll(".link")
.data(root.links())
.enter()
.append("path")
.attr("class","link")
.attr("d",d3.linkHorizontal()
.x(d=>d.y)
.y(d=>d.x))

const node=svg.selectAll(".node")
.data(root.descendants())
.enter()
.append("g")
.attr("class","node")
.attr("transform",d=>"translate("+d.y+","+d.x+")")
.on("click",(e,d)=>showInfo(d.data))

node.append("rect")
.attr("width",140)
.attr("height",40)
.attr("x",-70)
.attr("y",-20)

node.append("text")
.attr("text-anchor","middle")
.attr("dy",5)
.text(d=>d.data.name)

}

function showInfo(p){

document.getElementById("detail").innerHTML=

"<b>Tên:</b> "+p.name+"<br>"+
"<b>Năm sinh:</b> "+(p.birth||"")+"<br>"+
"<b>Mất:</b> "+(p.death||"")+"<br>"+
"<b>Ghi chú:</b> "+(p.note||"")

}

function zoomIn(){
zoomLevel+=0.1
document.querySelector("svg").style.transform="scale("+zoomLevel+")"
}

function zoomOut(){
zoomLevel-=0.1
document.querySelector("svg").style.transform="scale("+zoomLevel+")"
}
