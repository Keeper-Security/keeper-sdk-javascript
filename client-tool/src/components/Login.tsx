import * as React from "react";
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/styles";


export interface LoginProps {
    classes: any;
    performLogin: (user: string, password: string) => any;
}

interface LoginState {
}

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

    constructor(props: Readonly<LoginProps>) {
        super(props);
        this.submit = this.submit.bind(this)
    }

    public render() {
        const {classes} = this.props;
        return (
            <Container className={classes.container} maxWidth="sm">
                <form className={classes.form} onSubmit={this.submit}>
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

    private submit(e: any) {
        e.preventDefault();
        this.props.performLogin(e.target.email.value, e.target.password.value);
    }
}

export default withStyles(styles)(Login)
