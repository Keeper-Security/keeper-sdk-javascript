import {ActionType, getType} from 'typesafe-actions';

import * as actions from "../actions";
import {Company, Node} from "keeperapi";

type Action = ActionType<typeof actions>;

export interface CompanyState {
    readonly loading: boolean;
    readonly company?: Company;
    readonly lastError?: {
        node: Node,
        message: string
    };
}

const initialState = {
    loading: false,
};

export const companyReducer = (state: CompanyState = initialState, action: Action): CompanyState => {

    switch (action.type) {

        case getType(actions.loadedAction):
            return {
                ...state, company: action.payload
            };

        case getType(actions.epicSuccessAction):
            return {
                ...state, lastError: undefined
            };

        case getType(actions.epicFailureAction):
            console.log(action.payload.error || action.payload || "unknown error");
            return {...state};

        case getType(actions.nodeConversionErrorAction):

            return {
                ...state, lastError: {
                    node: action.payload.node,
                    message: action.payload.error
                }
            };

        default:
            return state;
    }
};
