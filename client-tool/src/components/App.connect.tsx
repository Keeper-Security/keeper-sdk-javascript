import {ActionType} from 'typesafe-actions';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import * as actions from "../actions";

import {RootState} from "../reducers";

import App, {AppStateProps} from "./App";

type Action = ActionType<typeof actions>;

interface OwnProps {
}

function mapStateToProps(state: RootState): AppStateProps {
    return {
        loggedInUser: state.login.loggedIn ? state.login.user : undefined,
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action>, props: OwnProps) => bindActionCreators({
    logout: () => actions.logoutAction(),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
