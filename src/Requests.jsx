/* eslint-disable no-unused-vars */
import axios from "axios";
import {useState,useEffect} from "react";
import { BASE_URL } from './utils/constants';
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "./utils/requestSlice";
const Requests=()=>{
    const requests=useSelector((store)=>store.requests);
    const dispatch=useDispatch();

  //  const [showButtons, setShowButtons] = useState(false);

    const reviewRequest=async (status,_id)=>{
        try{
            const res=await axios.post(BASE_URL + "/request/review/"+ status+"/" + _id,{}
                ,{withCredentials:true,}); 
                dispatch(removeRequest(_id));
        }catch(err){
            console.error(err.message);
        }
    }

    // const fetchRequests= async ()=>{
    //     try{
            
    //     const res= await axios.get(BASE_URL + "/user/requests/received" ,{withCredentials:true,});
    //     dispatch(addRequests(res.data.data));
    // }catch(err){
    //     console.error(err.message);
    //     } 
    // };
    // useEffect(()=>{
    //     fetchRequests();
    // },[]);
      useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await axios.get(
                    BASE_URL + "/user/requests/received",
                    { withCredentials: true }
                );

                dispatch(addRequests(res.data.data));
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchRequests();
    }, [dispatch]); 

    if(!requests) return;

    if(requests.length===0)return <h1 className="flex justify-center my-18 text-red-400 text-3xl ">No Requests Found</h1>;
    return (
        <div className="flex flex-col h-500 p-3 m-20 text-center my-18"> 
        <h1 className="text-bold text-green-400 text-3xl bg-black p-5 m-2 rounded-4xl">Requests Received</h1>  

      {requests.map((request)=>{
    const {_id,firstName,lastName,age,photoURL,gender,about}=request.fromUserId;
               return ( <div key={_id} className="flex  flex-col justify-between m-4 p-4 rounded-lg shadow-lg bg-black w-full mx-auto items-center">
                               
                               <div className="flex ">
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
      </div>

                    <div className="flex justify-between gap-90 "> <button className=" btn btn-primary " onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
<button className="btn btn-secondary  " onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
</div>
                    </div>)
            })}
        </div>
    )
}
export default Requests;