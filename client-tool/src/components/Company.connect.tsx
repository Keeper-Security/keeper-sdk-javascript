import {ActionType} from 'typesafe-actions';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import * as actions from "../actions";

import {RootState} from "../reducers";

import {Company} from "./Company";

type Action = ActionType<typeof actions>;

interface OwnProps {
}

const mapStateToProps = (state: RootState) => ({
    users: state.company.users,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>, props: OwnProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Company);
