import React from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

export default function LeTestingComponent(props) {
   const {loggedIn, setLoggedIn} = props;
   return (
      <div>
         {!{loggedIn}&&<LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         {<RegistrationForm loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}
      </div>
   );
}