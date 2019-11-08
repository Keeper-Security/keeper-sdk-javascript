import {ActionType} from 'typesafe-actions';
import {Dispatch, bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from "../actions";

import {RootState} from "../reducers";

import Login from "./Login";

type Action = ActionType<typeof actions>;

interface OwnProps {
}

function mapStateToProps(state: RootState) {
    return {};
}

const mapDispatchToProps = (dispatch: Dispatch<Action>, props: OwnProps) => bindActionCreators({
    performLogin: (user: string, password: string) => actions.loginAction({user, password}),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
