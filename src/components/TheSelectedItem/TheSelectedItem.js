import React from "react";

import './TheSelectedItem.css';

const theSelectedItem = (props) => (
    <article className="item" onClick={props.clicked}>
        <h2>{props.title}</h2>
        <p className="center--text">Center: {props.center}</p>
        <p className="desc--text">{props.desc}</p>
        {
            props.image ?
            <div>
                <img src={props.name} alt="Nasa" width="600" height="550" />
            </div>
            :
            <div>
                <video width="600" height="600" controls autoPlay loop>
                    <source src={props.name} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
        }
    </article>
);
export default theSelectedItem;