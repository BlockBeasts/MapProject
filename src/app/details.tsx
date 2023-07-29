import * as React from "react";

export default function Detail({teamInfo}:{teamInfo: {teamName: string, teamNumber: string, country: string, state: string, city: string, contactInfo: string, awards: string}}){

    return(
        <>
        <div>
            <div>
                <h1>{teamInfo.teamName}</h1>
            </div>
            <div>
                <h3>{teamInfo.teamNumber}</h3>
            </div>
        </div>
        <div>
            <h5>Location: </h5>
        </div>
        <div>
            <h5>{teamInfo.city}, {teamInfo.state}, {teamInfo.country}</h5>
        </div>
        <div>
            <h5>Contact Info: </h5>
        </div>
        <div>
            <h5>{teamInfo.contactInfo}</h5>
        </div>
        <div>
            <h5>Awards: </h5>
        </div>
        <div>
            <h5>{teamInfo.awards}</h5>
        </div>
        <div>
            <h5>message about contacting us if something is not right or you want to add something</h5>
        </div>
        </>
    )
}

