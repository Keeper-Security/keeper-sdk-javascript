import {ActionType, getType} from 'typesafe-actions';

import * as actions from "../actions";

type Action = ActionType<typeof actions>;

export interface LoginState {
    readonly user?: string;
    readonly loggedIn: boolean;
}

const initialState = {
    loggedIn: false
};

export const loginReducer = (state: LoginState = initialState, action: Action): LoginState => {

    switch (action.type) {

        case getType(actions.setUserAction):
            return {
                ...state, user: action.payload.user
            };

        case getType(actions.logoutAction):
            return {
                ...state, loggedIn: false
            };

        case getType(actions.loggedInAction):
            return {
                ...state, loggedIn: true
            };

        default:
            return state;
    }
};
