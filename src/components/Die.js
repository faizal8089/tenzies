import React from "react";
import '../css/die.css'

export default function Die(props){
    return (
        <div onClick={props.hold} style={props.isHeld?{backgroundColor: "#59E391"}:{backgroundColor: "white"}} className="die-face">
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}