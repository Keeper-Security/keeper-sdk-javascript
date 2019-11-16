import * as React from "react";
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/styles";


type ExtraProps = {
    classes: any;
    updateUser: (user: string) => any;
    performLogin: (password: string) => any;
}

export type LoginStateProps = {
    user: string
}

type LoginProps = ExtraProps & LoginStateProps;

type LoginState = {}

const styles = {
    container: {
        marginTop: "3rem"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        // marginTop: appTheme.spacing(1),
    },
    submit: {
        // margin: appTheme.spacing(3, 0, 2),
    },
};

class Login extends React.Component<LoginProps, LoginState> {

    public render() {
        const {classes} = this.props;
        return (
            <Container className={classes.container} maxWidth="sm">
                <form className={classes.form}
                      onSubmit={(e: any) => {
                          e.preventDefault();
                          this.props.performLogin(e.target.password.value);
                      }}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth={true}
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus={true}
                        value={this.props.user}
                        onChange={e => this.props.updateUser(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth={true}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth={true}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </Container>
        );
    }
}

export default withStyles(styles)(Login)
