import {ActionType} from 'typesafe-actions';
import {Dispatch, bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from "../actions";

import {RootState} from "../reducers";

import Login, {LoginDispatchProps, LoginStateProps} from "./Login";

type Action = ActionType<typeof actions>;

interface OwnProps {
}

function mapStateToProps(state: RootState): LoginStateProps {
    return {
        user: state.login.user || "",
        userError: state.login.userError,
        passwordError: state.login.passwordError,
        secondFactor: state.login.showSecondFactor,
        secondFactorError: state.login.secondFactorError
    };
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: OwnProps): LoginDispatchProps {
    return bindActionCreators({
        updateUser: (user: string) => actions.setUserAction({user}),
        performLogin: (password: string) => actions.loginAction({password}),
        prompt2FA: (errorMessage?: string) => actions.secondFactorPromptAction(errorMessage),
        submit2FA: (code: string) => actions.secondFactorSubmitAction(code),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
