import React from 'react';
import {Link} from "@reach/router";

export default class NotFoundPage extends React.Component {
    render() {
        return <div className="backGroundImage" style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1603848237872-14b6a8274c34?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)'
        }}>
            <div className={"centerFirstText"}>
                <div className={"firstCard"}>
                    <h1 style={{textAlign: "center"}}>
                        <Link to="/">404 </Link>
                    </h1>
                </div>
            </div>
        </div>
    }

}
