import React from "react";

import './Item.css';

const item = (props) => (
    <article className="User" onClick={props.clicked}>
        <h3>{props.title}</h3>
        <p className="Details">
        Center: {props.center} <br /> 
        {/* {props.description} <br /> <br /> {props.media_type} <br /> <br /> */}
        
        </p>
    </article>
);
export default item;