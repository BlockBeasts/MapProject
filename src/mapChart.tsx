import React from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"

import mapUtah from "././maps/source/gz_2010_us_050_00_5m.json"

export default function MapChart() {

    function getMapData(){
       
        return mapUtah

    }

  return (
    <ComposableMap projection="geoAlbers"
    projectionConfig={{scale:1000,
      center:[5, 31]
    }}>
      <Geographies geography={getMapData()}>
        {({ geographies }) =>
          geographies.map((geo) => (<>
            {geo.properties.STATE=="48" && 
            <Geography 
            key={geo.rsmKey} 
            geography={geo}
            fill="blue"
          stroke="#000000"
             />
             }</>
          ))
        }
      </Geographies>
    </ComposableMap>

  )
}