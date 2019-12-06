import {ActionType, getType} from 'typesafe-actions';

import * as actions from "../actions";
import {Keeper} from "../service/Keeper";

type Action = ActionType<typeof actions>;

export interface LoginState {
    readonly user?: string;
    readonly showSecondFactor: boolean;
    readonly secondFactorError?: string;
    readonly loggedIn: boolean;
}

const initialState = {
    loggedIn: false,
    showSecondFactor: false
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

        case getType(actions.secondFactorPromptAction):
            return {
                ...state,
                showSecondFactor: true,
                secondFactorError: action.payload
            };

        case getType(actions.secondFactorSubmitAction):
            Keeper.submitSecondFactor(action.payload);
            return {
                ...state, showSecondFactor: false
            };

        default:
            return state;
    }
};
