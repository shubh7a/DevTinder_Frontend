import { Outlet,Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addUser } from './utils/userSlice';
import { useEffect } from 'react';
import { BASE_URL } from './utils/constants';
const Body = () => {
    const dispatch=useDispatch();
    const navigate =useNavigate();
    const userData = useSelector((store) => store.user);

    useEffect(() => {
        const fetchUser = async () => {
            if (userData) {
                return;
            }
            try {
                const res = await axios.get(BASE_URL + "/profile/view", {
                    withCredentials: true,
                });
                dispatch(addUser(res.data));
            } catch (err) {
                if (err.status === 401) {
                    navigate("/login");
                }
                console.error(err);
            }
        };

        fetchUser();
    }, [dispatch, navigate, userData]);

    return (
        <div className="min-h-screen flex flex-wrap flex-col justify-between">
        <NavBar/>

             {/* Background Image Section */}
            <div
                className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://wallpaperaccess.com/full/323584.jpg')",
                }}
            >

                {/* Outlet Content */}
                <div className="p-20 z-10 min-h-full">
                    <Outlet />
                </div>

            </div>


        {/* <div className="flex flex-col items-center justify-center grow px-6 py-12">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Developers"
            className="w-full max-w-3xl rounded-3xl shadow-2xl"
          />

          <h1 className="text-5xl font-bold text-white mt-10 text-center ">
           <span className="text-orange-600 font-bold ">
          Welcome</span>  to  <span className="text-green-600 font-bold ">
          DevTinder</span>
          </h1>

          <p className="text-orange-600 font-bold text-lg mt-4 text-center max-w-2xl">
            Connect with developers, 
          </p>
          <p className="text-white font-bold text-lg mt-4 text-center max-w-2xl">
            collaborate on projects, and grow your
            professional network.
          </p>
          <p className="text-green-700  font-bold text-lg mt-4 text-center max-w-2xl">
           and grow your
            professional network.
          </p>
<div className="flex gap-4 mt-6 p-4 rounded-lg">
       <Link to="/login" className="btn btn-xl bg-orange-900 hover:bg-orange-600 text-white rounded-xl ">Login</Link>
<Link to="/signup" className="btn btn-xl bg-green-900 hover:bg-green-600 text-white rounded-xl">Primary</Link>
</div>
        </div>  */}
{/* 
          <Outlet />
     */}
            <Footer/>
        </div>
    )
};
export default Body;