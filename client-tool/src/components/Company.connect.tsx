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
        lastError: state.company.lastError
    };
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: OwnProps) {
    return bindActionCreators({
        convertNode: (node: Node) => actions.convertNodeAction({node}),
        addTestNode: (nodeName: string) => actions.addTestNodeAction({nodeName}),
        addManagedCompany: (companyName: string) => actions.addManagedCompanyAction({companyName}),
        loadCompany: (companyId: number) => actions.loadManagedCompanyAction({companyId})
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Company);
