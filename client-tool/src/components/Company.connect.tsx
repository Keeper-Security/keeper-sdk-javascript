import {Node} from "keeperapi";
import {ActionType} from 'typesafe-actions';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import * as actions from "../actions";

import {RootState} from "../reducers";

import Company, {CompanyStateProps} from "./Company";

type Action = ActionType<typeof actions>;

interface OwnProps {
}

function mapStateToProps(state: RootState): CompanyStateProps {
    return {
        company: state.company.company,
    };
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: OwnProps) {
    return bindActionCreators({
        convertNode: (node: Node) => actions.convertNodeAction({node}),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Company);
