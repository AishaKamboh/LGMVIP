import React, {useState} from "react";
import './styles.css'

const App=()=>{
    const [users, Setuser]=useState([]);
    const [isLoad, setLoad] = useState(false);
    const getusers=async()=>{
       setLoad(true)
        const response=await fetch("https://reqres.in/api/users?page=1");
        const jsonresponse=await response.json();
        Setuser(jsonresponse.data);
        if (jsonresponse){
        setLoad(false);
        }
    };
    
    
    return (
        <>
        <header>
        
        <nav id="head">
           
           <span id="hd">LetsGrowMore</span>
           <button id="btn" onClick={getusers}>Get Users</button>
          
        </nav>
        
    </header>
        
        <div className="App1">
        
            {users.map(({id,email, first_name, last_name, avatar})=>{
                return(
                    <div className="prof">
                        <div className="detail">
                            <img src={avatar} alt="profile"></img>
                            <p className="name">{first_name}{last_name}</p>
                           <p>{email}</p>
                        </div>
                    </div>
                )

            }
            )}

        </div>
        </>
    )
}



export default App
