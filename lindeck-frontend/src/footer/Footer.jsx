import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
   footer: {
        background: "black",
        padding: "0 2vh",
    },
}));

export default function Footer(props) {
    const classes = useStyles();

    function redirect() {
        props.history.push('/login')
    }

    return <footer>
        <div className={classes.footer}>
                        ©2020 Life in deck project.

        </div>
    </footer>
}
