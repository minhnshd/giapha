function addPerson(){

let name=prompt("Tên người")

if(!name) return

let newPerson={
name:name
}

if(!familyData.children)
familyData.children=[]

familyData.children.push(newPerson)

renderTree(familyData)

}
