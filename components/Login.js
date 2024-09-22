import React, { useRef } from "react";
import Header from "./Header";
import {useState} from "react";
import { checkValidateData } from "../utils/validate";
import { auth  } from "../utils/firebase";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { photoURL } from "../utils/constant";



function Login(){

    const [isSignInForm , setIsSignInForm] = useState(true);
    const [errorMessage , setErrorMessage] = useState(null);
    
    const dispatch = useDispatch();

    //We Need to reference this to that particular input box
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);


    function handleSignForm(e) {
        e.preventDefault(); // Prevent form submission

        // Retrieve input values

        // Validate the form data
        const message = checkValidateData(email.current.value , password.current.value);
        setErrorMessage(message);

        if (message) return; // Exit if there's a validation error

        // Determine if the form is for sign-in or sign-up
       if(!isSignInForm){
        //sign up logic
        
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            // update the user profile
            updateProfile(user, {
                displayName: name.current.value,
                 photoURL: photoURL,        
              }).then(() => {
                // Profile updated! => with updated user 
                const {uid , email , password, displayName , photoURL} = auth.currentUser;
                      //we need to dispatch an action => update the store
                      dispatch(addUser({uid: uid, email: email, password: password, displayName: displayName, photoURL: photoURL}))
              }).catch((error) => {
                // An error occurred
                setErrorMessage(error.message)
              });

            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            setErrorMessage(`${errorCode}: ${errorMessage}`)
        })
       }
       else{
        //sign in logic

        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);    
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            setErrorMessage(`${errorCode}: ${errorMessage}`)
        })
       }
    }


    function toggleSignInForm(){

        //toggle if true => then false  if false => then true
        // setIsSignInForm(!isSignInForm);
        // if(isSignInForm === true){
        //     setIsSignInForm(false)
        // }
        // else{
        //     setIsSignInForm(true)
        // }
        isSignInForm === true ? setIsSignInForm(false) : setIsSignInForm(true);
    }
    return (
        <div>
            <Header></Header>
            <div className="absolute">
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/dd4dfce3-1a39-4b1a-8e19-b7242da17e68/86742114-c001-4800-a127-c9c89ca7bbe4/IN-en-20240527-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="logo"></img>
            </div>
            <form className="w-[380px] absolute px-9 py-4 bg-black my-32 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80" onSubmit={(e) => e.preventDefault()}>
                <h2 className=" text-3xl font-bold py-4 px-[3px]">{isSignInForm ? "Sign In" : "Sign Up"}</h2>

                {
                    // The ! operator is used to invert a boolean value. If isSignInForm is true, !isSignInForm will be false. If isSignInForm is false, !isSignInForm will be true
                    // In JavaScript (and JSX), the && operator is used for conditional rendering. If the expression on the left side of && is true, the right side is evaluated and rendered. If the left side is false, the right side is ignored.
                    isSignInForm !== true && <input type="text" placeholder="Enter Your Name" className="p-4  my-4  w-full outline-none bg-gray-700" ref={name}></input> 
                    
                }

                 <input type="email" placeholder="Email Address" className="p-4 my-4 w-full  outline-none bg-gray-700" ref={email}  ></input> 
              
                <input type="password" placeholder="Enter Password" className="p-4  my-4  w-full outline-none bg-gray-700" ref={password}></input>
                <p className="text-red-400 text-lg font-bold px-[2px]">{errorMessage}</p>
                <button className="w-full font-bold text-xl p-2 my-6 bg-red-600" onClick={handleSignForm}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="text-center font-bold text-xl">Or</p>
                <p className="py-2 cursor-pointer font-semibold" onClick={toggleSignInForm}>{isSignInForm ? "New On Netflix ? Sign Up Now" : "Already Registered ? Sign In Now"}</p>
            </form>
        </div>
    )
}


export default Login;