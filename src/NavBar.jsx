 import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { removeUser } from "./utils/userSlice";

const NavBar=() =>{
const user =useSelector((store)=>store.user);
console.log("user in navbar",user);
const dispatch = useDispatch();
 const navigate = useNavigate();
 const handleLogout= async ()=>{
try{
await axios.post(BASE_URL + "/logout",{},{withCredentials:true});
dispatch(removeUser());
 return navigate("/login");
}catch(err){
 //  setError(err.message);
  console.error(err?.response?.message || "Something went wrong");
}
  };
  return(
    <div className="navbar bg-black shadow-sm">
  <div className="flex-1">
    <Link to="/" className=" text-yellow-400 text-2xl font-bold mx-5 ">DevTinder</Link>
  </div>

  {user ? (
  <div className="flex gap-2">
    <div className="text-blue-200 text-2xl  ">Welcome, {user.firstName}</div>
    {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
    <div className="dropdown dropdown-end ">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full px-1  ">
          <img
          className="rounded-full  border-2 border-yellow-500"
            alt="Tailwind CSS Navbar component"
            src={user.photoURL }/>
         </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-gray-700 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li >
          <Link to="/profile" className="justify-between text-xl text-green-400">
            Profile
            <span className="badge text-blue-500">New</span>
          </Link>
        </li>
        <li ><Link to="/connections" className=" text-xl text-green-400">Connections</Link></li>
        <li   ><Link  className=" text-xl text-green-400" to="/requests">Requests</Link></li>
        <li  ><Link to="/login" onClick={handleLogout} className="text-xl text-green-400">
          Logout
        </Link></li>
      </ul>
    </div>
  </div>
  ):(
     <figure>
        <img className="w-10 rounded-full border-2 mx-5 border-yellow-300"
          src={"https://static.vecteezy.com/system/resources/previews/023/654/784/non_2x/golden-logo-template-free-png.png"}
          alt="photo"
        />
      </figure>
  )}
</div>
  )
//   const user =useSelector((store)=>store.user);
//   const dispatch = useDispatch();
//   const navigate=useNavigate();
//   const handleLogout= async ()=>{
// try{
// await axios.post(BASE_URL + "/logout",{},{withCredentials:true});
// dispatch(removeUser());
//  return navigate("/login");
// }catch(err){
//  //  setError(err.message);
//   console.error(err?.response?.message || "Something went wrong");
// }
//   };
//     return (
//         <div>  
//         <div className="navbar flex mx-2 justify-end bg-black shadow-sm">
//   <div className="flex-1">
//     <Link to ="/" className="  text-xl font-bold text-orange-700 hover:text-orange-400 ">DevTinder</Link>
//   </div>
//   {user ? (
//     <div className="flex-none gap-2">
//       <div className="form-control">Welcome, {user.firstName}</div>
//       {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
//       <div className="dropdown dropdown-end mx-5 flex "> 
//         <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//           <div className="w-10 rounded-full">
//           <img
//             alt="user Pic"
//              src={user.photoUrl || "https://i.pravatar.cc/40"}/>
//         </div>
//       </div>
//       <ul
//         tabIndex="-1"
//         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//         <li>
//           <Link to="/Profile" className="justify-between">
//             Profile
//             <span className="badge">New</span>
//           </Link>
//         </li>
//         <li><Link to ="/connections">Connections</Link></li>
//         <li><Link to ="/requests"> Requests</Link></li>
//         <li><Link to="/logout" onClick={handleLogout}>Logout</Link></li>
//       </ul>
//     </div>
//   </div>
//   ) : (
//     <div className="flex-none gap-2">
//       <button className="btn btn-ghost bg-white text-black font-bold border-cyan-100 rounded-2xl hover:bg-gray-100 hover:scale-110 
// transition-all duration-300"
//        onClick={() => navigate("/login", { state: { isLoginForm: true } })}>Login</button>
//       <button className=" mx-4 btn btn-ghost bg-green-300 text-black font-bold border-white rounded-2xl hover:bg-green-500 hover:scale-110 
// transition-all duration-300"
//        onClick={() => navigate("/login", { state: { isLoginForm: false } })}>Signup</button>
//     </div>
//   )}
// </div>
  
//         </div>
   // )
};
    


export default NavBar;
