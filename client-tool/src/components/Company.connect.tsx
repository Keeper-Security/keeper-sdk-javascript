import {Node} from "keeperapi";
import {ActionType} from 'typesafe-actions';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import * as actions from "../actions";

import {RootState} from "../reducers";

import Company, {CompanyDispatchProps, CompanyStateProps} from "./Company";
import {getNodeRoles, getNodeTeams, getNodeUsers} from "../service/Keeper";

type Action = ActionType<typeof actions>;

interface OwnProps {
}

function mapStateToProps(state: RootState): CompanyStateProps {
    let nodes = state.company.company
        ? state.company.company!.data.nodes[0].nodes || []
        : [];

    return {
        company: state.company.company,
        inProgress: state.app.inProgress,
        nodes: nodes.map(x => {
            return {
                node: x,
                userCount: getNodeUsers(x).length,
                roleCount: getNodeRoles(x).length,
                teamCount: getNodeTeams(x).length,
                errorMessage: state.company.lastError && state.company.lastError.node.node_id === x.node_id
                    ? state.company.lastError.message
                    : undefined
            }
        })
    };
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: OwnProps): CompanyDispatchProps {
    return bindActionCreators({
        convertNode: (node: Node) => actions.convertNodeAction({node}),
        addTestNode: (nodeName: string) => actions.addTestNodeAction({nodeName}),
        addManagedCompany: (companyName: string) => actions.addManagedCompanyAction({companyName}),
        loadCompany: (companyId: number) => actions.loadManagedCompanyAction({companyId}),
        refresh: () => actions.refreshAction()
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Company);
