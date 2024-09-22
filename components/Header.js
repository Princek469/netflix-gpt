import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import { removeUser } from "../utils/userSlice";
import { NetflixLogo, SUPPORTED_LANGUAGE } from "../utils/constant";
import { toggleGptSearchView } from "../utils/GptSlice";
import { changeLanguage } from "../utils/configSlice";
// import { useState } from "react";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);


    //fetch gpt search view
    const gptSearchView = useSelector((store) => store.gpt.GptSearchNow) //if my gptSearchView is true then language is shown

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            //user sign in or sign up
            if (user) {
              const {uid , email , password, displayName , photoURL} = user;
              //we need to dispatch an action => update the store
              dispatch(addUser({uid: uid, email: email, password: password, displayName: displayName, photoURL: photoURL}))
              // we need to navigate when the user sign in it re-direct to browse page
              navigate("/browse")
            } else {
              dispatch(removeUser())
              //user sign out remove the user and redirect to login page
              navigate("/")
            }
          });
    }, [])
    
    function handleSignOut(e){
        e.preventDefault();
        signOut(auth).then(() => {
            //we need to remove the user dispatch the action
            dispatch(removeUser());
        }).catch((error) => {
            // An error happened.
            console.error("Sign-out error: ", error);
        });
    }
   
    function handleGptSearchClick(e){
        e.preventDefault();

        //Toggle the function => dispatch the action to update the store
        dispatch(toggleGptSearchView());
    }

    //Language Change
    function handleLanguageChange(e){
        //we need to dispatch an action to update the store ans show on ui
        dispatch(changeLanguage(e.target.value))
    }
    

    return (
        <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between"> 
            <img className="w-44" src={NetflixLogo} alt="Netflix-Logo"></img>
          
            {/* Only load this portion when the user is signed in or signed up => when we have the user */}
            {user && (
                <div className="flex items-center justify-between p-5 mx-4 gap-4  rounded-lg">
                    {gptSearchView && <select className="p-2 m-3 bg-red-500 text-white font-bold rounded-md cursor-pointer border-none outline-none" onChange={handleLanguageChange}>
                        {
                            SUPPORTED_LANGUAGE.map((language, index) => {
                                return <option key={index} value={language.identifier}>{language.name}</option>
                            })
                        }
                    </select>}
                <button className="p-2 bg-purple-700 font-bold text-white rounded-md hover:bg-purple-600 transition duration-300" onClick={handleGptSearchClick}>
                   {gptSearchView ? "Home Page" : "GPT Search"}
                    </button>
                <div className="flex items-center gap-4">
                    <button onClick={handleSignOut} className="font-bold text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">Sign Out</button>
                    <img className="w-10  h-10 cursor-pointer rounded-lg" alt="usericon" src={user?.photoURL}></img>
                </div>
            </div>
            
            )}
        </div>
    );
}

export default Header;
