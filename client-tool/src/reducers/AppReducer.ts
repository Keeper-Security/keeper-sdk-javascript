import {ActionType, getType} from 'typesafe-actions';

import * as actions from "../actions";

type Action = ActionType<typeof actions>;

export interface AppState {
    readonly inProgress: boolean;
}

const initialState = {
    inProgress: false,
};

export const appReducer = (state: AppState = initialState, action: Action): AppState => {

    switch (action.type) {

        case getType(actions.progressAction):
            return {
                ...state,
                inProgress: action.payload,
            };

        default:
            return state;
    }
};
