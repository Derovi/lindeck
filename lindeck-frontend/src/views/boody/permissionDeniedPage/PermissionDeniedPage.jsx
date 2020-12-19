import React from 'react';
import {Link} from "@reach/router";

class PermissionDenied extends React.Component{
    render(){
        return <div>
            <p style={{textAlign:"center"}}>
              <Link to="/"> PERMISSION DENIED</Link>
            </p>
          </div>;
    }
}
export default PermissionDenied;