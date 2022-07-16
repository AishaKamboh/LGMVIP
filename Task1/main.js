// select elements in DOM
 const form=document.querySelector("#formField");
 const inputValue=document.querySelector("#itemInput");
 const itemsList=document.querySelector("#item-List");
 const filterTab=document.querySelectorAll(".nav-item");


//empty array
let todoList=[];

// filter method
const getFilter=function(type){
    let filterItems=[];
    switch(type){
        case "todo":
            filterItems=todoList.filter((item) => !item.isDone );

        break;
        case "done":
            filterItems=todoList.filter((item) => item.isDone );

        break;

        default:
            filterItems=todoList;
            break;
    }
    getItem(filterItems)
}


//delete item method
const removeItem=function(item){
    const removeIndex=todoList.indexOf(item);
    todoList.splice(removeIndex, 1);
}


 //update item method
const updateItem=function(currentpreIndex, value){
    const newItem=todoList[currentpreIndex];
    newItem.name=value;
    todoList.splice(currentpreIndex, 1, newItem);
    setlocalStorage(todoList);
}
8


 //handle event
    const handleEvent=function(itemData){
        const items=document.querySelectorAll(".list-group-item");
        items.forEach((item)=>{
            if(item.querySelector(".title").getAttribute("data-time")==itemData.addedAt){

                //done 
                item.querySelector("[item-done]").addEventListener("click",function(e){
                    e.preventDefault();
                    const preIndex=todoList.indexOf(itemData);
                    const currentItem=todoList[preIndex];
                    const  currentClass=currentItem.isDone ? "fa-solid" : "fa-regular";

                    currentItem.isDone=currentItem.isDone ? false : true;
                    todoList.splice(preIndex, 1, currentItem);
                    setlocalStorage(todoList);
                    const newClass=currentItem.isDone ? "fa-solid" : "fa-regular";
                    this.firstElementChild.classList.replace(currentClass,newClass);

                    const filtertype=document.querySelector("#tabValue").value;
                    getFilter(filtertype);
                });

                //edit
                item.querySelector("[item-edit]")
                .addEventListener("click",function(e){
                    e.preventDefault();
                    inputValue.value=itemData.name;
                    document.querySelector('#objIndex').value=todoList.indexOf(itemData);
    
                });

                 //delete
            item.querySelector("[item-delete]")
            .addEventListener("click",function(e){
                e.preventDefault();
               if(confirm("Are you sure want to remove this item?")){
                   itemsList.removeChild(item);
                   removeItem(item);
                   setlocalStorage(todoList);
                   return todoList.filter((item)=> item != itemData);
               }

            });
            }
        })
    }


  // get item list
  const getItem=function(todoList){
    itemsList.innerHTML="";
    if(todoList.length>0){
    todoList.forEach((item)=>{
        const newClass=item.isDone ? "fa-solid" : "fa-regular";
        itemsList.insertAdjacentHTML("beforeend",` <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="title" data-time="${item.addedAt}">${item.name}</span>
        <span>
            <a href="#" item-done><i class="${newClass} fa-circle-check green"></i></a>
            <a href="#" item-edit><i class="fa fa-pencil-square-o blue" ></i></a>
            <a href="#" item-delete><i class="fa-regular fa-circle-xmark red"></i></a>
        </span>
    </li>`);
    handleEvent(item);
    })
}else{
    itemsList.insertAdjacentHTML("beforeend",` <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>No Record Found!</span>
   
</li>`);

}
}

 // set value in local storage
    const setlocalStorage=function(todoList){
        localStorage.setItem("todoList", JSON.stringify(todoList));
    };
    // get value from local storage
    const getlocalStorage=function(){
        const todoStorage=localStorage.getItem("todoList");
        if(todoStorage==="undefined" || todoStorage===null){
            todoList=[];
        }else{
            todoList=JSON.parse(todoStorage);
        }
        console.log("item",todoList);
        getItem(todoList);
    }

   


document.addEventListener("DOMContentLoaded", ()=>{
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        const inputItem=inputValue.value.trim();
    if(inputItem.length===0){
        alert("Please enter the Task!");
    }else{
        const currentpreIndex=document.querySelector("#objIndex").value;
        if(currentpreIndex){
            // update
            updateItem(currentpreIndex, inputItem);
            document.querySelector("#objIndex").value="" ;




        } else{
            const Obj={
                name: inputItem,
                isDone: false,
                addedAt:  new Date().getTime(),
            };
            todoList.push(Obj);
            //  call the function
            setlocalStorage(todoList);

        }
        // call the  function

getItem(todoList);
    }
inputValue.value="";
    
    });
    //filter tabs
    filterTab.forEach((tab)=>{
        tab.addEventListener('click' , function(e){
            e.preventDefault();
            const tabtype=this.getAttribute("data-type");
            document.querySelectorAll('.nav-link').forEach((nav)=>{
                nav.classList.remove("active");
            });
            this.firstElementChild.classList.add("active");
            getFilter(tabtype);
            document.querySelector("#tabValue").value=tabtype;
        })
    })
    // load items
    // call the get function
    getlocalStorage ();

})
