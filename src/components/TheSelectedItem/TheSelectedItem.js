import React from "react";

import './TheSelectedItem.css';

const theSelectedItem = (props) => (
    <article className="item" onClick={props.clicked}>
        {/* <h3>{props.title}</h3> */}
        {
            props.video ?
            <div>
                <img src={props.title} alt="Nasa" width="500" height="500" />
            </div>
            :
            <div>
                <video width="500" height="500" controls autoPlay loop>
                    <source src={props.title} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>

        }
        {/* <p className="Details">
        {props.description} <br /> <br />
        {props.center} <br /> 
        </p> */}
    </article>
);
export default theSelectedItem;