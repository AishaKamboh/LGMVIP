 
 var row=1;
  var  submitBtn=document.querySelector("#btn1");
  submitBtn.addEventListener("click", displayDetail);
   

function displayDetail(){
    var inputName=document.querySelector("#name").value.trim();
var address=document.querySelector("#Address").value.trim();
var insName=document.querySelector("#insName").value.trim();
var pName=document.querySelector("#pName").value;
var sValue=document.querySelector("#sValue").value;



if(!inputName || !address  || !insName ||  !pName || !sValue){
    alert("Please fill the all boxes");
    return;
}


var tableItem=document.querySelector(".tablecontent");
var newRow=tableItem.insertRow(row);
var cell1=newRow.insertCell(0);
var cell2=newRow.insertCell(1);
var cell3=newRow.insertCell(2);
var cell4=newRow.insertCell(3);
var cell5=newRow.insertCell(4);
 

        cell1.innerHTML=inputName;
        cell2.innerHTML=address;
        cell3.innerHTML=insName;
        cell4.innerHTML=pName;
        cell5.innerHTML=sValue;
        
        row++;
}

