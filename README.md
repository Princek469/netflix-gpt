# Netflix-gpt
useRef() Hook =>  It takes the reference of that particular field
Firebase Setup => first create the project on firebase
- run command => npm run firebase
- add config in firebase.js
- run command -> firebase login
- firebase init
- build
- asnwer the question => no
- npm run build
- firebase deploy
- add the code of sign up and sign in with their api

# Sign up and Sign is successfully executed => no error found

- When we create user it should store in our Redux Store 

# We need to install redux store libraries
- npm install @reduxjs/toolkit
- npm install react-redux
- Then we create appStore for create store 
- configure store it is carry list of object and they have also root level "reducer" which contains all the slice of reducers
- Then we create userSlice 
- by createSlice = it contains list of object
- name:
- initialState:
- reducers : this reducers gives the configuration of user 
- reducers : addUser(state, action) => {
    return action.payload
}, removeUser(state, action) => {
    return null;
}

# when the user sign in it will store in redux store
- use the api onAuthStateChanged() => This is called when any authentication happened 
- we want it will called only once so use =>  
- useEffect(() => {       => This useEffect will called when the component  intially rendered
- inside this we use the API 
- onAuthStateChanged(auth, (user) => {
    //user sign in or sign up
    if(user){
        const {uid, email, password} = user => we will extract many things from user
        => dispatch() Hook   => it will update the store 
        => when user sign in it will navigate to browse page
        navigate("/browse) => this is Hook => this will use inside child component
    }
    else{
        // sign out user is come outside it will remove
        dispatch(removeUser())
    }
}) 
},[])

- implement sign out feature  
- updated profile API
Bug fix : sign up user display name and display profile image updated
bug fix : if the user is logged in redirect to browse page and user is log out redirect to login page => and vice a versa
extract movie data from tmdb movie database 
- store movie data inside our redux store =>       create the moviesSlice and add it to appStore
- create the own custom hook for Now Playing Moviex
- Create Movie Slice
- Update store with movie data
- Planning for MainContainer ans Secondary Container
- Fetch data for trailer video and create custom
- Update the Store with trailer video data
- Embedded the you tube video 
 #Secondary Container
 - Movie List - Popular
  - n * Cards
- Movie list - Trending, Horror, Documentaries
 - n*movie cards

 - GPT SEARCH Page
 - GPT Search Bar
 - Multi lanugage feature in our app


 - Create the account on platform.openai.com => For API key
 - Use OpenAi Gpt
 - When we setUp this it throw an error => it does not support in browser like environment
 - So we need to add this in our oprnai config file => dangerouslyAllowBrowser: true (it allow)










# Features of Netflix-gpt
- Login/SignUP form
 - Sign in / Sign Up form
 - redirect to browse page

- Browse (after authentication or after login on page)
- Header
- Main Movir
 - Trailor in Background
 - Title & Describtion
 - Movie Suggestions
 - Movie lists * N  (so many movies)

- Netflix-gpt
 - search bar

#   N e t f l i x - G P T  
 