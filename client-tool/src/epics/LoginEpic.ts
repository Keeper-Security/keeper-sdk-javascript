import {ActionsObservable, StateObservable} from "redux-observable";
import {ActionType, isActionOf} from 'typesafe-actions';

import {filter, map, mergeMap} from 'rxjs/operators';

import * as actions from "../actions";
import {RootState} from "../reducers";
import {Keeper} from "../service/Keeper";

type Action = ActionType<typeof actions>;

function loginEpic(action$: ActionsObservable<Action>, store: StateObservable<RootState>) {
    return action$.pipe(
        filter(isActionOf(actions.loginAction)),
        mergeMap(x => Keeper.login(store.value.login.user!, x.payload.password)),
        map(actions.loggedInAction)
    );
}

export default [
    loginEpic,
];
