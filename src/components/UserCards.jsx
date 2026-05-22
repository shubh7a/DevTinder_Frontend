import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";
const UserCards = ({ user, isEditProfile }) => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
  if (!user) return null;
  const { _id,firstName, lastName,age, gender,about,photoURL,} = user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
      dispatch(removeFeed(userId));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="card bg-black w-110 shadow-sm flex gap-2 border-2 p-1 border-yellow-600">
      
     {/* {isEditProfile &&  */}
     <h1 className="card-title justify-center  m-5 text-2xl text-blue-400  ">{firstName} {lastName}</h1>
     {/* } */}
      <figure>
        <img
          src={photoURL}
          alt="photo"
          className="border-2 rounded-2xl border-yellow-100  h-108 w-96 object-cover "
        />
      </figure>
      <div className="card-body p-4  flex flex-col items-start gap-4">
      <div className=" p-1 text-purple-400 font-bold flex flex-col gap-4">
           <h2 > <span className="text-orange-500">Name : </span> {firstName + " " + lastName}</h2>
        <p><span className="text-orange-500">Age : </span>  {age},   <span className="text-orange-500">Gender : </span>  {gender}</p>
      </div>
      <div className=" p-1 text-purple-400 font-bold w-full h-33 overflow-y-auto">
        <span className="text-orange-500">About : </span> 
        <p>{about}</p>
      </div> 
          {!isEditProfile ? (
  <div className="card-actions justify-between w-90 p-3 mx-4">
    <button className="btn btn-lg  bg-primary rounded-2xl" onClick={() => handleSendRequest("ignored", user._id)}>Ignore</button>
    <button className="btn btn-lg rounded-2xl btn-secondary" onClick={() => handleSendRequest("interested", user._id)}>
      Interested
    </button>
  </div>
):(<div className="card-actions justify-between w-90 p-3 mx-4">
            <button className="btn btn-secondary bg-red-600" onClick={()=>navigate("/connections")}>
              Connections
            </button>
            <button className="btn btn-primary bg-blue-600 " onClick={()=>navigate("/requests")}>
              Requests
            </button>
          </div>)

}



          
        
      </div>
    </div>
  );
};

export default UserCards;