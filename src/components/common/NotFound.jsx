import React from 'react';

const NotFound = () => {
    return ( 
        <div className="row align-items-center justify-content-center" style={{height:"400px"}}>
            <div className="col-12 border mt-5 text-center p-3"  style={{maxWidth:"500px" 
            , color:"#5F6F86" 
            , borderRadius:"20px"
            , boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
            }}>
            
                <span className="mt-5" style={{fontSize:"50px"}}>404</span>
                <h5 className="text-dark mt-4 mb-3">Page not found</h5>
            </div>
        </div>
    );
}
 
export default NotFound;