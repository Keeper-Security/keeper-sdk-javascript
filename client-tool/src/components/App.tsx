import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import SvgIcon from '@material-ui/core/SvgIcon';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {blueGrey} from "@material-ui/core/colors";

import Login from "./Login.connect";
import Company from "./Company.connect";
import {withStyles} from "@material-ui/styles";

export type AppStateProps = {loggedInUser?: string}

type ExtraProps = {
    classes: any;
    logout: () => any;
}

type AppProps = AppStateProps & ExtraProps;

const palette = {
    primary: {main: '#263238', contrastText: '#ffffff'},
    secondary: {main: '#f9bc0a', contrastText: '#000000'},
};

// const palette = {
//     primary: blueGrey
// };

const appTheme = createMuiTheme({palette});

const styles = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: appTheme.spacing(2),
    },
    title: {
        flexGrow: 1,
        marginLeft: "2rem"
    },
    user: {
        display: "flex",
        alignItems: "center"
    }
};

class App extends React.Component<AppProps, {}> {

    render() {
        const {classes} = this.props;
        return (
            <ThemeProvider theme={appTheme}>
                <div className="app">
                    <AppBar position="static">
                        <Toolbar>
                            <img src="https://www.keepersecurity.com/assets/branding/keeper-logo-light.svg"/>
                            {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
                            {/*    <MenuIcon/>*/}
                            {/*</IconButton>*/}
                            <Typography variant="h6" className={classes.title}>
                                Node To Managed Company Conversion
                            </Typography>
                            {
                                this.props.loggedInUser &&
                                <div className={classes.user}>
                                    <Typography>{this.props.loggedInUser}</Typography>
                                    <Button
                                        color="secondary"
                                        onClick={_ => this.props.logout()}>
                                        Sign out
                                    </Button>
                                </div>
                            }
                        </Toolbar>
                    </AppBar>
                    {
                        this.props.loggedInUser
                            ? <Company/>
                            : <Login/>
                    }
                </div>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(App)
