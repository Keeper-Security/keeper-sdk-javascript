import {ActionType, getType} from 'typesafe-actions';

import * as actions from "../actions";
import {Vault} from "keeperapi";

type Action = ActionType<typeof actions>;

export interface CompanyState {
    readonly loading: boolean;
    readonly vault?: Vault;
}

const initialState = {
    loading: false,
};

export const companyReducer = (state: CompanyState = initialState, action: Action): CompanyState => {

    switch (action.type) {

        case getType(actions.loadedAction):
            return {
                ...state, vault: action.payload
            };

        default:
            return state;
    }
};
