import {ActionType, getType} from 'typesafe-actions';

import * as actions from "../actions";
import {Company} from "keeperapi";

type Action = ActionType<typeof actions>;

export interface CompanyState {
    readonly loading: boolean;
    readonly company?: Company;
    readonly lastError?: string;
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

        case getType(actions.nodeConversionErrorAction):

            return {
                ...state, lastError: action.payload.error
            };

        default:
            return state;
    }
};
