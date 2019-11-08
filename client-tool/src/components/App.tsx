import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {blueGrey} from "@material-ui/core/colors";

import Login from "./Login.connect";
import {withStyles} from "@material-ui/styles";

export type AppStateProps = {loggedInUser?: string}

type ExtraProps = {
    classes?: any;
    logout: () => any;
}

type AppProps = AppStateProps & ExtraProps;

export const appTheme = createMuiTheme({
    palette: {
        primary: blueGrey
    }
});

const styles = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: appTheme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    user: {
        display: "flex",
        alignItems: "center"
    }
};

class App extends React.Component<AppProps, {}> {


    constructor(props: Readonly<AppProps>) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    render() {
        const {classes} = this.props;
        return (
            <ThemeProvider theme={appTheme}>
                <div className="app">
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Client Tool
                            </Typography>
                            {
                                this.props.loggedInUser &&
                                <div className={classes.user}>
                                    <Typography>{this.props.loggedInUser}</Typography>
                                    <Button color="inherit" onClick={_ => this.props.logout()}>Sign out</Button>
                                </div>
                            }
                        </Toolbar>
                    </AppBar>
                    {
                        this.props.loggedInUser
                            ? <div>Logged In</div>
                            : <Login/>
                    }
                </div>
            </ThemeProvider>
        );
    }

    private logout() {

    }
}

export default withStyles(styles)(App)
