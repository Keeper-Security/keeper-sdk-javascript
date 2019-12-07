import {ActionsObservable, StateObservable} from "redux-observable";
import {ActionType, isActionOf} from 'typesafe-actions';

import {catchError, filter, map, mergeMap} from 'rxjs/operators';

import * as actions from "../actions";
import {RootState} from "../reducers";
import {Keeper} from "../service/Keeper";
import {from, of} from "rxjs";

type Action = ActionType<typeof actions>;

function loginEpic(action$: ActionsObservable<Action>, store: StateObservable<RootState>) {
    return action$.pipe(
        filter(isActionOf(actions.loginAction)),
        mergeMap(x => from(Keeper.login(store.value.login.user!, x.payload.password)).pipe(
            map(_ => actions.loggedInAction()),
            catchError(error => of(actions.loginFailureAction(error)))
        ))
    );
}

export default [
    loginEpic,
];
