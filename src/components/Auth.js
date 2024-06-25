import { useState } from "react";
import "../App.css";
import { auth } from "../config/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const Auth = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleLogin = async (e) => {
      e.preventDefault();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("userCredential: ", userCredential, userCredential.user);
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
            <button id="submit" type="submit" onClick={handleLogin}>Login</button>
         </form>
      </div>
   );
}