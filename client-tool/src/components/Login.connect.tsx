import {ActionType} from 'typesafe-actions';
import {Dispatch, bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from "../actions";

import {RootState} from "../reducers";

import Login, {LoginStateProps} from "./Login";

type Action = ActionType<typeof actions>;

interface OwnProps {
}

function mapStateToProps(state: RootState): LoginStateProps {
    return {
        user: state.login.user || ""
    };
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: OwnProps) {
    return bindActionCreators({
        updateUser: (user: string) => actions.setUserAction({user}),
        performLogin: (password: string) => actions.loginAction({password}),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
