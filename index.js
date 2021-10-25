const admin =  async() =>{
  var raw = undefined;
  let url =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  let response = await fetch(url, {
    method: "GET",
    raw: undefined,
  });
  let res = await response.json();
  let tableData = res
  console.log(tableData);
 
  tableBuild(tableData)


}
admin()

function tableBuild(data){
    console.log(data)
  const numberOfItems = data.length
  const numberPerPage = 10
  const currentPage = 1
  const numberOfPages = Math.ceil(numberOfItems/numberPerPage)
  function buildPage(currPage) {
      const trimStart = (currPage-1)*numberPerPage
      const trimEnd = trimStart + numberPerPage
      
      building(data.slice(trimStart, trimEnd),data)

  }
  buildPage(1)
  const page =  document.getElementById("pagination-wrapper")
  page.innerHTML =""
  page.style.display ="flex"
  for(let i=0;i<numberOfPages;i++)
  {
      // pagination-wrapper
      const div =  document.createElement("div")
      div.innerHTML = `
      <button class="pagination" value ="${i+1}">${i+1}</button>
      `
      page.appendChild(div)

  }
  const pagei = document.querySelectorAll(".pagination")
  for(let i=0;i<pagei.length;i++)
  {
      pagei[i].addEventListener("click",() =>{  
          buildPage(pagei[i].value)
      })
  }
 
  



 

}

function building(data,totalData){
    console.log(totalData)
  var table = $('#table-body')
  
  document.getElementById("table-body").style.visibility ="visible";
  document.getElementById("table-body").innerHTML =""
  for(var i=1 in data)
  {
      
      var row = `<tr>
      <td><input class="deleteCheck" type="checkbox" id="${data[i].id}checkbox"></td>
      <td>${data[i].name}</td>
      <td>${data[i].email}</td>
      <td>${data[i].role}</td>
      <td><span><i class="fa fa-edit editButton" id=${data[i].id}edit></i></span><span style="margin-left:10px;color:red"><i class="fa fa-trash deleteButton" id=${data[i].id}delete></i></span></td>
      `
table.append(row)

    
   
  }
  const  r = document.querySelectorAll(".deleteButton")
  
  for(let i=0;i<r.length;i++)
  {
      
      r[i].addEventListener("click",() =>{
          // console.log(r[i].id)
          const docs = r[i].id.replace("delete","")
          
          const filterValue = totalData.filter(doc =>doc.id!==docs)
          document.getElementById("table-body").innerHTML =""
          tableBuild(filterValue)
      })
  }

  const edit =  document.querySelectorAll(".editButton");
  for(let i=0;i<edit.length;i++)
  {
      console.log(totalData)
      const docs =  edit[i].id.replace("edit","")
      const element =  totalData.find(doc =>doc.id===docs)
      
      const dialogBoxEdit =  document.getElementById("dialogBoxEdit");
      const dialog =  document.createElement("dialog")
      dialog.id = `${i}Dialog`
      dialog.style.width = "400px"
      dialog.innerHTML = `
      <form onsubmit="return false;">
      <input style="width: 90%;
      margin-left: 5%;
      margin-top: 5%;" type ="text" id="${edit[i]}EditName" value = "${element.name}" required />
      <br>
      <input style="width: 90%;
      margin-left: 5%;
      margin-top: 5%;" id="${edit[i]}EditEmail" type="email" value = "${element.email}" required />
      <br>
      <input style="width: 90%;
      margin-left: 5%;
      margin-top: 5%;" id="${edit[i]}EditRole" type = "text" value = "${element.role}" required />
      <br>
      <button style="width: 90%;
      margin-left: 5%;
      margin-top: 5%;" id="updateButton" type="button">Submit</button>
      </form>
      `
      dialogBoxEdit.appendChild(dialog)
      edit[i].addEventListener("click",() =>{
          dialog.showModal()
          document.getElementById("updateButton").addEventListener("click",(e) =>{
              e.preventDefault()
              let objIndex = totalData.findIndex(doc =>doc.id===docs);
              console.log(objIndex)
              totalData[objIndex].name = document.getElementById(`${edit[i]}EditName`).value;
              totalData[objIndex].email = document.getElementById(`${edit[i]}EditEmail`).value;
              totalData[objIndex].role = document.getElementById(`${edit[i]}EditRole`).value;
              document.getElementById("table-body").innerHTML =""
              tableBuild(totalData)
              dialog.close()
          })

      })
  }
  const deleteCheck =  document.querySelectorAll(".deleteCheck")
  let multipleSelect = [];
  for(let i=0;i<deleteCheck.length;i++)
  {
     
     const docs  =  deleteCheck[i].id.replace("checkbox","");
     deleteCheck[i].addEventListener("change",() =>{
      if(document.getElementById(`${data[i].id}checkbox`).checked===true)
      {
          const deleteData =  totalData.find(doc =>doc.id===docs)
          multipleSelect.push(deleteData)   
      }
      else{
           multipleSelect = multipleSelect.filter(doc =>doc.id!==docs);
      }
      if(multipleSelect.length===1)
      {
          document.getElementById("multipleDelete").style.display = "block";

      }
      // const results = arrayOne.filter(({ value: id1 }) => !arrayTwo.some(({ value: id2 }) => id2 === id1));

     
     })
   
     
  }
  document.getElementById("multipleDelete").addEventListener("click",() =>{
      document.getElementById("table-body").innerHTML =""
      const results = totalData.filter(doc => !multipleSelect.some(docs =>docs.id===doc.id))
      tableBuild(results)
  })
}
function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  console.log(filter)
  
  table = document.getElementById("our-table");
  
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
      
    td = tr[i].getElementsByTagName("td")[1];
    console.log(tr[i].getElementsByTagName("td")[2])
    
    if (td) {
       
      txtValue = td.textContent || td.innerText;
      
      
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
          td =tr[i].getElementsByTagName("td")[2];
          if(td){
              txtValue = td.textContent || td.innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  tr[i].style.display = "";
                }
              else{
                  td =tr[i].getElementsByTagName("td")[3];
                  if(td){
                      txtValue = td.textContent || td.innerText;
                      if (txtValue.toUpperCase().indexOf(filter) > -1) {
                          tr[i].style.display = "";
                        }
                        else{
                          tr[i].style.display = "none";
                        }  
              }
          }

       
      }
    }       
  }
}}