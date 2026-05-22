import { useState } from "react"
import axios from "axios"
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { addUser } from "./utils/userSlice";
const Login = () => {
const [error, setError] = useState("");  
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [emailId, setEmailId] = useState("");
const [password, setPassword] = useState("");
const [isLoginForm,setIsLoginForm] = useState(true);
const dispatch = useDispatch();
const navigate = useNavigate();

// SignUp Handler
    const handleSignUp = async () => {
      try{
        const res =await axios.post(BASE_URL + "/signup",
          {firstName,lastName,emailId,password},
          {withCredentials:true},);
          dispatch(addUser(res.data.data));
          return navigate("/");
      }catch(err){
        setError(err?.response?.data || "Something went wrong during signup");
        console.log(err);
      }
    }


// Login Handler
const handleLogin=async ()=>{
  try{
   const res=await axios.post(BASE_URL + "/login",
      {emailId,password},
      {withCredentials:true},
    );
    console.log(res.data.data)
    dispatch(addUser(res.data.data));
    return navigate("/");
  }catch(err){
    setError(err?.response?.data || "Something went wrong during login");
    console.error(err);
  }
 }
  return  (
   <div className="flex justify-center my-5 ">
     <div className=" card  card-border border-2 border-yellow-400 bg-black w-96 opacity-98 rounded-2xl">
  <div className="card-body items-center">
    <h2 className="card-title text-2xl text-yellow-400 font-bold " onClick={isLoginForm?handleLogin:handleSignUp}>
      {isLoginForm?"Login":"SignUp"}
    </h2>
   <div>
<fieldset className="fieldset w-xs p-4">
{!isLoginForm && <>
  <label className="label text-xl text-yellow-400">First Name : </label>
  <input 
    type="text"  
    className="input rounded-xl bg-black text-white" 
    placeholder="Enter your first name"  
    value={firstName} 
    onChange={(e) => setFirstName(e.target.value)} 
  />

  <label className="label text-xl text-yellow-400">Last Name : </label>
  <input 
    type="text" 
    className="input rounded-xl bg-black text-white" 
    placeholder="Enter your last name" 
    value={lastName} 
    onChange={(e) => setLastName(e.target.value)} 
  />
</>}
  <label className="label text-xl text-yellow-400">Email : </label>
  <input 
    type="text"  
    className="input rounded-xl bg-black text-white" 
    placeholder="emailId@gmail.com"  
    value={emailId} 
    onChange={(e) => setEmailId(e.target.value)} 
  />

  <label className="label text-xl text-yellow-400 ">Password : </label>
  <input 
    type="password" 
    className="input rounded-xl bg-black text-white" 
    placeholder="Enter your password" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)} 
  />

</fieldset>
   </div>
   <p className="text-green-500">{error}</p>
    <div className=" flex justify-end card-actions w-full ">
      <button className="btn rounded-2xl font-bold text-black bg-yellow-500" onClick={isLoginForm?handleLogin:handleSignUp}>
      {isLoginForm ? "Login" : "SignUp"}
      </button>
      <button onClick={() => setIsLoginForm((value)=>!value)} className=" btn  btn-small bg-yellow-500 text-black rounded-2xl cursor-pointer ">
        {isLoginForm ? "Don't have an account? :- Sign Up" : "Already have an account? :- Login"}
      </button>
    </div>
  </div>
</div>
   </div>
  )
  
};

export default Login;

