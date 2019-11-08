import {ActionType} from 'typesafe-actions';

import * as actions from "../actions";

type Action = ActionType<typeof actions>;

export interface CompanyState {
    readonly loading: boolean;
    readonly users?: string[];
}

const initialState = {
    loading: false,
};

export const companyReducer = (state: CompanyState = initialState, action: Action): CompanyState => {

    switch (action.type) {

        default:
            return state;
    }
};
