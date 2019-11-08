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

export interface AppProps {
    classes?: any;
    loggedIn: boolean;
}

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
};

class App extends React.Component<AppProps, {}> {
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
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                    <div className="main">
                        {
                            this.props.loggedIn
                                ? <div>Logged In</div>
                                : <Login/>
                        }
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(App)
