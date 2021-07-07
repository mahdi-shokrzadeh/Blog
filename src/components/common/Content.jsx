import React from 'react';


const Content = ({html}) => {
    return ( 
        <div dangerouslySetInnerHTML={{ __html: html }} />
    );
}
 
export default Content;