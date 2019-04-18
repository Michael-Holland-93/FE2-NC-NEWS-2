import React from 'react';
import Comments from './Comments';
import '../styling/Sidebar.css';

const Sidebar = (props) => {
    return (
        <div className="Sidebar">
            <Comments article={props.article}/>
        </div>
    );
};

export default Sidebar;