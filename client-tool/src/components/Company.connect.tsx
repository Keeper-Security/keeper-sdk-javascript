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
        vault: state.company.vault,
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action>, props: OwnProps) => bindActionCreators({
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Company);
