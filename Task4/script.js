
    const screen1Data=document.querySelector(".screen-1");
    const screen2Data=document.querySelector(".screen-2");
    const temporaryReult=document.querySelector(".temporary-result");
    const numberInput=document.querySelectorAll(".number");
    const operationInput=document.querySelectorAll(".operation");
    const equalSign=document.querySelector(".equal-sign");
    const deleteEl=document.querySelector(".delete-all");
    const lastElDlete=document.querySelector(".delete-last-num");

    let num1 = '';
    let num2 = '';
    let result = '';
    let lastOperation = '';
    let dot = false;


    numberInput.forEach(number =>{
        number.addEventListener('click', (e)=>{
            if(e.target.innerHTML ==='.' && !dot){
                dot=true;
            }else if(e.target.innerHTML ==='.' && dot){
                return;
            }
            num2 += e.target.innerHTML;
         screen2Data.innerHTML = num2;
            
        })
    });

  
    operationInput.forEach(operation =>{
        operation.addEventListener('click', (e)=>{
            if(!num2) result;
            dot= false;
            const operationName = e.target.innerHTML;
            if(num1 && num2 && lastOperation){
                applyOperation();
            }else{
                result=parseFloat(num2);
            }
            clearNum(operationName);
            lastOperation=operationName;  
        })
    });

    function clearNum(name = ''){
        num1 += num2+'' + name + '';
        screen1Data.innerHTML=num1;
     screen2Data.innerHTML='';
        num2='';
        temporaryReult.innerHTML=result;
    }

    function applyOperation(){

        if(lastOperation==='x'){
            result=parseFloat(result) * parseFloat(num2);
        } else if(lastOperation==='+'){
            result= parseFloat(result) + parseFloat(num2);
        } else if(lastOperation==='-'){
            result= parseFloat(result) - parseFloat(num2);
        } else if(lastOperation==='/'){
            result= parseFloat(result) / parseFloat(num2);
        } else if(lastOperation==='%'){
            result= parseFloat(result) % parseFloat(num2);
        }
    }


    equalSign.addEventListener('click',(e)=>{
        if(!num1 || !num2) return;
        dot=false;
        applyOperation();
        clearNum();
     screen2Data.innerHTML=result;
        temporaryReult.innerHTML='';
        num2=result;
        num1='';
        
    });

    deleteEl.addEventListener('click', (e)=>{
     screen2Data.innerHTML='0';
        screen1Data.innerHTML='0';
        num1='';
        num2='';
        result='';
        temporaryReult.innerHTML='0';
    });

    lastElDlete.addEventListener('click',(e)=>{
     screen2Data.innerHTML='';
        num2='';
        
    })


