import React from 'react';
import {Link} from "@reach/router";

class NotFoundPage extends React.Component{
    render(){
        return <div>
            <p style={{textAlign:"center"}}>
              <Link to="/">404 </Link>
            </p>
          </div>;
    }
}
export default NotFoundPage;