'use client'

import React from "react";
import Search from "./search";
import Detail from "./details";
import Map from "./map";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc, collection, query, where, Query, getDocs, getDocsFromServer } from "firebase/firestore";


import styles from "./page.module.css";
import TaskBar from "./taskBar";

export default function MyAppComponent() {

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

  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("team");
  const [teamNumber, setTeamNumber] = useState("");
  const [teamName, setTeamName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [task, setTask] = useState("search");
  
function updateSearchValue (value: string ) {

  let searchQuery: Query|undefined = undefined

  setSearchValue(value);
  if (searchType === "team") {
    setTeamNumber(searchValue);
    setTeamName("");
    searchQuery = query(teamsRef, where("teamNumber", "==", value));
  }
  if (searchType === "name"){
    setTeamName(searchValue);
    setTeamNumber(""); 
    searchQuery = query(teamsRef, where("teamName", "==", value));
  }

  if (searchType === "country"){
    setCountry(searchValue);
    searchQuery = query(teamsRef, where("country", "==", value));
  }

  if (searchType === "state"){
    setState(searchValue);
    searchQuery = query(teamsRef, where("state", "==", value));
  }

  if (searchQuery!=undefined){
    getTeamInfo(searchQuery)
  }
}

async function getTeamInfo(query: Query) {
  
  const snapshot = await getDocs(query);
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());

      //TODO: update team info
      //TODO update map
    },);
}





// const queryDB = async (query: Query) => {
//   const querySnapshot = await getDoc(query);
//   const data = querySnapshot.data();
//   console.log(data);
//   return data;
// }

function updateSearchType (type: string ) {


  setSearchType(type);
  if (searchType === "team") {
    setTeamNumber(searchValue);
    setTeamName("");
  }
  if (type === "name"){
    setTeamName(searchValue);
    setTeamNumber(""); 
  }

  
}

function updateMapChoice(teamNumber:string){

}

function updateTask(task:string){
  setTask(task);
}


  return (
    <div className={styles.mainContainer}>
      <div className={styles.taskContainer}>
           <TaskBar updateSelection={updateTask}/>
           </div>
         <div className={styles.rightContainer}>
           <Search

              updateSearchValue={updateSearchValue}
              updateSearchType={updateSearchType}
            />
            <div>
            <Map
        countryCode="countryCode"
        stateCode="stateCode"
        onClick={updateMapChoice}
     />
      <Detail
       teamInfo={{teamName: "teamName", teamNumber: "teamNumber", country: "country", state: "state", city: "city", contactInfo: "contactInfo", awards: "awards"}}
      ></Detail>
           
            </div>
            
            
          </div>
      
      

      
      
    </div>
  );

}