import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';

const Menu = ({items}) => {
    if (!Array.isArray(items)) {
        console.error("The 'items' prop should be an array.");
        return null;
    }

    return (
        <ListGroup>
            {items.map((item, index) => (
                <ListGroup.Item key={index}>{item}</ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default Menu;