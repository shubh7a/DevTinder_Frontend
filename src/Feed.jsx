import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./utils/feedSlice";
import UserCards from "./components/UserCards";
const Feed = () => {
     const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();
    
        useEffect(() => {
            const getFeed = async () => {
                if (feed) return;
                try {
                    const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
                    dispatch(addFeed(res?.data?.data));
                } catch (err) {
                    console.error(err);
                }
            };
            getFeed();
        }, [feed, dispatch]);
        if(!feed)return;
        if(feed.length <= 0 )return <h1 className="text-2xl font-bold flex justify-center text-red-500 ">No more users found !</h1>
    return (
        feed && (<div className="flex justify-center my-10">
            <UserCards user={feed[0]}  />
        </div>)
    );
};
export default Feed;