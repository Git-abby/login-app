import React from "react";
import { useAuth } from "../../contexts/authContexts";
import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
    const {currentUser} = useAuth();
    console.log(currentUser);
    
    const navigate = useNavigate();
    const onSignout = async (e) => {
        e.preventDefault();
        try{
            await doSignOut();
            navigate('/');
        }catch(error){
            console.error(error.message);
        }
    }
  return (
    <div>
      {currentUser && currentUser ? (
        <>
          <h1>Welcome </h1>
          <div>
            <h3>{currentUser.email}</h3>
          </div>
          <button type="button" onClick={onSignout}>Logout</button>
          {/* <button type="button" onClick={onSignout}>Logout</button> */}
        </>
      ) : (
        <>
          <p>Loading...</p>
          </>
      )}
    </div>
  );
}

export default Profile;
