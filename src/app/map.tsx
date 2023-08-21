import MapChart from "@/mapChart";
import * as React from "react";

import styles from "./page.module.css";

export default function Map({countryCode, stateCode, onClick}: {countryCode: string, stateCode: string,onClick: Function}) {


    //display map beased on country code and state code
    //click on team to display details

    return(
        <div className={styles.mapContainer}><MapChart/></div>
        
    )
}

