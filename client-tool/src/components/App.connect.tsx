import {ActionType} from 'typesafe-actions';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import * as actions from "../actions";

import {RootState} from "../reducers";

import App, {AppProps} from "./App";

type Action = ActionType<typeof actions>;

interface OwnProps {
}

function mapStateToProps(state: RootState): AppProps {
    return {
        loggedIn: state.login.loggedIn,
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action>, props: OwnProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
