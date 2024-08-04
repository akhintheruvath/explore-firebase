import { useState } from "react";
import "../App.css";
import { auth } from "../config/config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const Auth = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
         console.log("userCredential: ", userCredential, userCredential.user);
      } catch (error) {
         console.log("Error while email login: ", error);
      }
   }

   const handleGoogleLogin = async (e) => {
      e.preventDefault();
      const provider = new GoogleAuthProvider();
      try {
         const result = await signInWithPopup(auth, provider);
         console.log("result: ", result);
      } catch (error) {
         console.log("Error while google login: ", error);
      }
   }

   return (
      <div>
         <form className="form">
            <label>Email</label><br />
            <input
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="input"
               type="email"
            /><br />
            <label>Password</label><br />
            <input
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="input"
               type="password"
            /><br />
            <button id="submit" type="submit" onClick={handleLogin}>Login</button><br />
            <button id="google-submit" type="submit" onClick={handleGoogleLogin}>Login With Google</button>
         </form>
      </div>
   );
}

export default Auth;