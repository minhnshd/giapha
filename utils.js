function exportJSON(){

let dataStr="data:text/json;charset=utf-8,"+
encodeURIComponent(JSON.stringify(familyData,null,2))

let dl=document.createElement("a")

dl.setAttribute("href",dataStr)

dl.setAttribute("download","family.json")

dl.click()

}
