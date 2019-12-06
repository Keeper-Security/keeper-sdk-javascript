import * as React from "react";
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/styles";
import {AuthUIComponent, Keeper} from "../service/Keeper";

export type LoginDispatchProps = {
    updateUser: (user: string) => any;
    performLogin: (password: string) => any;
    prompt2FA: (errorMessage?: string) => any;
    submit2FA: (code: string) => any;
}

export type LoginStateProps = {
    classes?: any;
    user: string,
    secondFactor: boolean,
    secondFactorError?: string
}

type LoginProps = LoginDispatchProps & LoginStateProps;

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

class Login extends React.Component<LoginProps, LoginState> implements AuthUIComponent {

    componentDidMount(): void {
        Keeper.registerAuthComponent(this);
    }

    componentWillUnmount(): void {
        Keeper.unRegisterAuthComponent();
    }

    public render() {
        const {classes} = this.props;
        return (
            <Container className={classes.container} maxWidth="sm">
                <form className={classes.form}
                      onSubmit={(e: any) => {
                          e.preventDefault();
                          if (this.props.secondFactor) {
                              this.props.submit2FA(e.target.secondFactor.value)
                          } else {
                              this.props.performLogin(e.target.password.value);
                          }
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
                    {
                        this.props.secondFactor &&
                        <TextField
                            error={!!this.props.secondFactorError}
                            helperText={this.props.secondFactorError}
                            variant="outlined"
                            margin="normal"
                            required={true}
                            fullWidth={true}
                            id="secondFactor"
                            label="Verification Code"
                            name="secondFactor"
                            autoFocus={true}
                        />
                    }
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

    prompt2FA(errorMessage?: string): void {
        this.props.prompt2FA(errorMessage);
    }
}

export default withStyles(styles)(Login)
