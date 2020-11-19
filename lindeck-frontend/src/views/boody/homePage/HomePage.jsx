import React from 'react';
import './HomePage.css'
import {navigate} from "@reach/router";
import GS from "../../../common/classes/GlobalStorage";

export default class HomePage extends React.Component {
    state = {
        startAnimationHrRef: null,
        firstMovingTextStyle: {},
        secondMovingTextStyle: {}
    }

    clickStart = () => {
        if (!GS.getSession().isActive) {
            navigate('/login')
        } else {
            navigate('/user/' + GS.getSession().username + '/deck-build')
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        if (this.bigLine.getBoundingClientRect().y < 200) {
            this.setState({secondMovingTextStyle: {right: 0}})
        } else {
            this.setState({secondMovingTextStyle: {right: "100%"}})
        }

        if (this.bigLine.getBoundingClientRect().y < 500) {
            this.setState({firstMovingTextStyle: {right: 0}})
        } else {
            this.setState({firstMovingTextStyle: {right: "100%"}})
        }

    }

    render() {
        return <>
            <div className="backGroundImage" style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1603848237872-14b6a8274c34?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)'
            }}>
                <div className={"centerFirstText"}>
                    <div className={"firstCard"}>
                        <h1>LIFE IN DECK</h1>
                        <hr/>
                        <div className="button_cont" align="center">
                            <button className="mainPageButton" onClick={this.clickStart}>
                                Start!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <hr ref={ref => this.bigLine = ref} className="blackLine"/>
            <div className="backGroundImage" style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1603657886780-a9369c8433f4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)'
            }}>
                <div className={"centerText"} style={this.state.firstMovingTextStyle}>
                    <div className={"secondCard"}>
                        <h1>Ну чё сказать</h1>
                        <hr/>
                        <p>- А вот эти пальчики, Штирлиц, мы обнаружили на чемодане русской радистки.
                            - Группенфюрер, я советский разведчик.
                            - Да хоть американский! Почему без перчаток, позаражать нас всех хотите?!</p>
                    </div>
                </div>
                <div className={"centerText"} style={this.state.secondMovingTextStyle}>
                    <div className={"thirdCard"}>
                        <h1>Ну чё сказать</h1>
                        <hr/>
                        <p>- А вот эти пальчики, Штирлиц, мы обнаружили на чемодане русской радистки.
                            - Группенфюрер, я советский разведчик.
                            - Да хоть американский! Почему без перчаток, позаражать нас всех хотите?!</p>
                    </div>
                </div>
            </div>
        </>
    }
}