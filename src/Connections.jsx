import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./utils/connectionsSlice";

const Connections=()=>{ 
    const dispatch = useDispatch();
    const connections=useSelector((store)=>store.connections);
    // const fetchConnections = async()=>{
    //     try{
    //         const res= await axios.get(BASE_URL+"/user/connections",{withCredentials:true,});
    //         dispatch(addConnections(res.data.data));
       
    //     }catch(err){
    //         console.error(err);
    //     }
    // }
    // useEffect(()=>{
    //     fetchConnections();
    // },[]); 

    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const res = await axios.get(
                    BASE_URL + "/user/connections",
                    { withCredentials: true }
                );

                dispatch(addConnections(res.data.data));
            } catch (err) {
                console.error(err);
            }
        };

        fetchConnections();
    }, [dispatch]);
 
    if(!connections) return;

    if(connections.length===0)return <h1 className="flex justify-center my-18 ">No Connections Found</h1>;
    return (
        <div className=" flex flex-col h-full p-3 m-20 text-center my-18"> 
        <h1 className="text-bold text-green-400 text-3xl bg-black p-5 m-2 rounded-4xl">These are My Connections</h1>  

      
      {connections.map((connection)=>{
    const {_id,firstName,lastName,age,photoURL,gender,about}=connection;
               return ( <div key={_id} className="flex flex-wrap  justify-between m-4 p-4 rounded-lg shadow-lg bg-black w-2/3 mx-auto items-center">
                             <div> 
                          <img alt="pic" className=" w-48 h-35 rounded-lg object-cover border-2 border-orange-400" src={photoURL}/> 
                           </div>

                   
                 <div className=" p-1 text-purple-400 font-bold flex flex-col gap-4">
           <h2 > <span className="text-orange-500">Name : </span> {firstName + " " + lastName}</h2>
        <p><span className="text-orange-500">Age : </span>  {age},   <span className="text-orange-500">Gender : </span>  {gender}</p>
      </div>
      <div className=" p-1 text-purple-400 font-bold w-full h-33 overflow-y-auto">
        <span className="text-orange-500">About : </span> 
        <p>{about}</p>
      </div> 
                 
                 
                  
                    </div>) 
            })}
        </div>
    )
}
export default Connections;