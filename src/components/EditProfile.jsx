 import { useState } from "react";
import UserCards from "./UserCards";
 import axios from "axios";
 import { BASE_URL } from "../utils/constants";
 import { useDispatch } from "react-redux";
  import { addUser } from "../utils/userSlice";
 const EditProfile=({user})=>{
        const [firstName,setFirstName] = useState(user.firstName);
        const [lastName,setLastName]=useState(user.lastName);
        const [age,setAge] = useState(user.age);
      //  const [photo, setPhoto] = useState(null);
        const [photoURL,setPhotoURL] = useState();
        const [gender,setGender]=useState(user.gender);
        const [about ,setAbout]=useState(user.about);

        const [error,setError]=useState("");

        const dispatch=useDispatch();
        const [showToast ,setShowToast] = useState(false);
 
//UPLOAD PHOTO FUNCTION
// const uploadPhoto = async () => {

//   try {

//     console.log("Function Running");

//     if (!photo) {
//       alert("Select Image First");
//       return;
//     }

//     const formData = new FormData();

//     formData.append("photo", photo);

//     console.log(photo);

//     const res = await axios.post(
//       BASE_URL + "/upload",
//       formData,
//       {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     console.log(res.data);

//     setPhotoURL(res.data.imageUrl);

//   } catch (err) {

//     console.log(err);

//   }
// };
//SAVE PROFILE FUNCTION
        const saveProfile=async()=>{
            //clear error before saving profile
            setError("");
            try{
                const res =await axios.patch(BASE_URL + "/profile/edit",
                  
                  {firstName, lastName, age, photoURL , gender, about},
                  {withCredentials:true});
                dispatch(addUser(res?.data?.data));
                setShowToast(true);
                 setTimeout(()=>{
                  setShowToast(false);
                },3000);
                console.log({
  firstName,
  lastName,
  age,
  photoURL,
  gender,
  about,
});
            }catch(err){
                setError(err?.response?.data || "something went wrong");
            }
        }
    return (  
      <div>
 <div className="flex justify-center my-10">   
<div className="flex justify-center mx-10">  
    <div className="card bg-black w-105 shadow-sm border-2 border-yellow-600">

       <h1 className="card-title justify-center mx-35 m-7 text-2xl text-green-400  ">Edit Profile</h1>
   
  <div className="card-body flex mx-5">
    {/* <h1 className="card-title justify-center mx-35">Edit Profile</h1> */}
   <div className="flex flex-col gap-4">    
 {/*First Name*/}
    <fieldset className="fieldset">
     
  <legend className="fieldset-legend text-xl text-yellow-200" >First Name</legend>
  <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="input " placeholder="abcxyz@gmail.com" />
  
</fieldset>
 {/* Last Name*/}
 <fieldset className="fieldset">
  <legend className="fieldset-legend text-xl text-yellow-200 ">Last Name</legend>
  <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="input" placeholder="Enter your Last Name" />
</fieldset>
{/*Age*/}
    <fieldset className="fieldset">
     
  <legend className="fieldset-legend text-xl text-yellow-200" >Age</legend>
  <input type="text" value={age} onChange={(e)=>setAge(e.target.value)} className="input" placeholder="Enter your Age" />
  
</fieldset>
 {/* Gender*/}
 <fieldset className="fieldset">
  <legend className="fieldset-legend text-xl text-yellow-200">Gender</legend>
  <input type="text" value={gender} onChange={(e)=>setGender(e.target.value)} className="input" placeholder="Enter your Gender" />
</fieldset>
{/* About*/}
 <fieldset className="fieldset">
  <legend className="fieldset-legend text-xl text-yellow-200">About</legend>
  <input type="text" value={about} onChange={(e)=>setAbout(e.target.value)} className="input" placeholder="Enter your About" />
</fieldset>
<fieldset className="fieldset">
{/* 
  <div className="flex flex-col gap-4">


  <img
    src={
      user.photoURL 
    }
    alt="profile"
    className="w-32 h-32 rounded-full object-cover"
  />

  <div>
    <label className="font-bold">
      Upload From Device
    </label>

   <input
  type="file"
  className="file-input"
  onChange={(e) => {
    console.log(e.target.files[0]);
    setPhoto(e.target.files[0]);
  }}
/>

   <button
  type="button"
  className="btn btn-primary mt-2"
  onClick={() => {
    console.log("Button Clicked");
    uploadPhoto();
  }}
>
  Upload Photo
</button>
  </div>


  <div className="divider">OR</div>


  <div>
    <label className="font-bold">
      Add Image By URL
    </label>

    <input
      type="text"
      placeholder="Paste image URL"
      className="input input-bordered w-full mt-2"
      value={photoURL}
      onChange={(e) =>
        setPhotoURL(e.target.value)
      }
    />
  </div>

</div> */}

  
  <legend className="fieldset-legend text-xl text-yellow-200">Photo</legend>
  <input type="text" value={photoURL } placeholder="Enter your Photo URL" onChange={(e)=>setPhotoURL(e.target.value)} className="input" />

  </fieldset>
   </div>
   <p className="text-red-500">{error}</p>
    <div className="card-actions justify-end">
      <button className="btn rounded-2xl bg-amber-950 " onClick={saveProfile}>
        Save Profile
        </button>
    </div>
  </div>
</div>   
</div>
    {/* <UserCards user={{ firstName, lastName, age, gender, about ,photoURL }} /> */}
    <UserCards user={user}   isEditProfile={true}/>
</div> 
{showToast && (
<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Updated Successfully.</span>
  </div>
</div>
)}

    </div>
    )
 }
 export default EditProfile;