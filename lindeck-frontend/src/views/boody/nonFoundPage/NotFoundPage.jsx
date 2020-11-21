import React from 'react';
import {Link} from "@reach/router";

export default class NotFoundPage extends React.Component {
    render() {
        return <div>
            <p style={{textAlign: "center"}}>
                <Link to="/">404 </Link>
            </p>
        </div>;
    }

}
