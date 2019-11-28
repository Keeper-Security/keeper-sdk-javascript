import {Node} from "keeperapi";
import {ActionType} from 'typesafe-actions';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import * as actions from "../actions";

import {RootState} from "../reducers";

import Company, {CompanyDispatchProps, CompanyStateProps} from "./Company";

type Action = ActionType<typeof actions>;

interface OwnProps {
}

function mapStateToProps(state: RootState): CompanyStateProps {
    let nodes = state.company.company
        ? state.company.company!.data.nodes[0].nodes || []
        : [];

    function counter(prop: string, nodeId: number): number {
        if (!state.company.company)
            return 0;
        // @ts-ignore
        return state.company.company!.data[prop].reduce((sum, item) => {
            return item.node_id === nodeId ? ++sum : sum
        }, 0)
    }

    return {
        company: state.company.company,
        nodes: nodes.map(x => {
            return {
                node: x,
                userCount: counter("users", x.node_id),
                roleCount: counter("roles", x.node_id),
                teamCount: counter("teams", x.node_id),
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
        loadCompany: (companyId: number) => actions.loadManagedCompanyAction({companyId})
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Company);
