A. Initialize the SDK

1. Create an project in firebase
2. Config a SDK from "Project Overview => Project Setting"
3. Add app and copy SDK config, then pass to file config in the React App

B. Authentication

1. In firebase Project: go to "Build => Authentication"
2. Switch to tap "Sign-in method", => Add New Provider.
3. Enable the Sign-in method that you want.
4. If use Social Sign In. Such as Facebook:

   - Init the app in https://developers.facebook.com/apps/?show_reminder=true.
   - Config enable sign-in with facebook and past the url link of Firebase
     (at the bottom of the Facebook Provider in Signin Method Tab)
   - Get the App ID and API key and Past back to the Facebook Provider in Signin Method Tab
   - Lấy file config:
     const app = initializeApp(firebaseConfig);

5. Use in React :
   a. Default method: refer to this doc
   https://firebase.google.com/docs/auth/web/facebook-login

   b. Use Hook:
   https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth

   useAuthenState:
   -- use to get the user that signed in.
   const [user, loading, error] = useAuthState(auth, options);

   useCreateUserWithEmailAndPassword
   -- use to register a user by email and password. stored at authentication Users of Firebase Project
