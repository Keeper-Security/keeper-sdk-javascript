import {ActionType, getType} from 'typesafe-actions';

import * as actions from "../actions";
import {Keeper} from "../service/Keeper";

type Action = ActionType<typeof actions>;

export interface LoginState {
    readonly user?: string;
    readonly loggedIn: boolean;
    readonly showSecondFactor: boolean;
    readonly userError?: string;
    readonly passwordError?: string;
    readonly secondFactorError?: string;
}

const initialState = {
    loggedIn: false,
    showSecondFactor: false
};

export const loginReducer = (state: LoginState = initialState, action: Action): LoginState => {

    switch (action.type) {

        case getType(actions.setUserAction):
            return {
                user: action.payload.user,
                loggedIn: false,
                showSecondFactor: false
            };

        case getType(actions.loginAction):
            return {
                ...state,
                userError: undefined,
                passwordError: undefined
            };

        case getType(actions.logoutAction):
            return {
                ...state, loggedIn: false
            };

        case getType(actions.loggedInAction):
            return {
                ...state, loggedIn: true
            };

        case getType(actions.loginFailureAction):
            let error = {};
            switch (action.payload.error) {
                case "user_does_not_exist":
                    error = {
                        userError: action.payload.message
                    };
                    break;
                case "auth_failed":
                    error = {
                        passwordError: "Invalid email or password combination, please re-enter."
                    };
                    break;
                default:
                    error = {
                        passwordError: action.payload.message || action.payload.error
                    };
                    break;
            }
            return {
                ...state,
                ...error
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
                ...state, secondFactorError: undefined
            };

        default:
            return state;
    }
};
