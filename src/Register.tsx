
/* Register.js（完成版） */

import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
/* 「Link」をimport↓ */
import { Navigate, Link } from "react-router-dom";

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  /* ↓関数「handleSubmit」を定義 */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch(error) {
      alert("正しく入力してください");
    }
  };

 /* ↓state変数「user」を定義 */
 const [user, setUser] = useState<User>();

 /* ↓ログインしているかどうかを判定する */
 useEffect(() => {
   onAuthStateChanged(auth, (currentUser) => {
    if(currentUser !== null) {
        setUser(currentUser);        
    }
   });
 }, []);

 return (
   <>
     {/* ↓ログインしていればマイページを表示 */}
     {user ? (
       <Navigate to={`/`} />
     ) : (
       <>
         <h1>新規登録</h1>
         <form onSubmit={handleSubmit}>
           <div>
             <label>メールアドレス</label>
             <input
               name="email"
               type="email"
               value={registerEmail}
               onChange={(e) => setRegisterEmail(e.target.value)}
             />
           </div>
           <div>
             <label>パスワード</label>
             <input
               name="password"
               type="password"
               value={registerPassword}
               onChange={(e) => setRegisterPassword(e.target.value)}
             />
           </div>
           <button>登録する</button>
           {/* ↓リンクを追加 */}
           <p>ログインは<Link to={`/login/`}>こちら</Link></p>
         </form>
       </>
     )}
   </>
 );
};

export default Register;