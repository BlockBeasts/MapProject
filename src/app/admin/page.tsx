'use client'
import { Button, TextField } from "@mui/material";
import { useState } from "react";

import styles from "./admin.module.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Query, collection, doc, getDocs, getDocsFromServer, getFirestore, query, setDoc, where } from "firebase/firestore";
import { get } from "http";

export default function Page() {

    const firebaseConfig = {
        apiKey: "AIzaSyBu0eLrs96yCioIUEW_EhU2s3CawwW8wkM",
        authDomain: "ftc-map-project.firebaseapp.com",
        projectId: "ftc-map-project",
        storageBucket: "ftc-map-project.appspot.com",
        messagingSenderId: "520430265458",
        appId: "1:520430265458:web:50f2e86dad0ac18a880eeb",
        measurementId: "G-YHCM347DZK"
      };
    
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      const db = getFirestore(app);
      const teamsRef = collection(db, "teams");

    const [actionChoice, setActionChoice] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [teamInfo, setTeamInfo] = useState({} as any);
    const [modifiedContact, setModifiedContact] = useState(false);


   function searchTeam() {
       
        if (searchValue!=null && searchValue!=""  ){
            let searchQuery: Query = query(teamsRef, where("teamNumber", "==", searchValue));
    
            getTeamInfo(searchQuery);
        }
    }

    async function getTeamInfo(query: Query) {
  
        const snapshot = await getDocsFromServer(query);
          snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
      
            setTeamInfo(doc.data());
            setModifiedContact(false);
        
          },);
      }

      function updateContactInfo(value: { target: { value: any; }; }){
        setTeamInfo({...teamInfo, contactInfo: value.target.value});
        setModifiedContact(true);
        }

        async function updateDB(){
            //update contact info in DB
            //setModifiedContact(false);
            console.log("updateDB");
            console.log(teamInfo);
            console.log(teamInfo.teamNumber);
            console.log(teamInfo.contactInfo);

            await setDoc(doc(db, "teams", teamInfo.teamNumber),teamInfo);
            setModifiedContact(false);
        }

      

    return <div className={styles.mainContainer}>
        <div>
            <div>
            <Button 
                variant="outlined"
                onClick={() => setActionChoice("updateTeamInfoManually")}
            >Update team information manually</Button>
        </div>
        <div>
        <Button
            variant="outlined"
            onClick={() => setActionChoice("updateTeamInfoFromAPI")}
            > Run API update</Button>
        </div>
        </div>

   
   {actionChoice === "updateTeamInfoManually" && <div>Update team info
   <TextField
                id= "outlined-basic"
                defaultValue="Small"
                placeholder="Team number"
                value={searchValue}
                onChange={(value) => setSearchValue(value.target.value)}
            />
            <Button variant="outlined" onClick={searchTeam}>Search</Button>
            {teamInfo!=null && <div>
                <div>Team Number: {teamInfo.teamNumber}</div>
                <div>Team Name: {teamInfo.teamName}</div>
                <div>Country: {teamInfo.country}</div>
                <div>State: {teamInfo.state}</div>
                <div>City: {teamInfo.city}</div>
                <div>Contact Info</div>
                <TextField
                id= "outlined-basic"
                placeholder="Contact Info"
                value={teamInfo.contactInfo}
                onChange={updateContactInfo}
            />
            </div>}
            {modifiedContact && 
            <Button
            variant="outlined"
            onClick={updateDB}
            > UpdateDB</Button>}
            
    </div>}
            
            
    </div>
  }