import {Epic} from "redux-observable";
import {filter, map, mergeMap, tap} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';

import {ActionType, isActionOf} from 'typesafe-actions';

import * as actions from "../actions";
import {RootState} from "../reducers";

type Action = ActionType<typeof actions>;

const loginEpic: Epic<Action, Action, RootState> = (action$, store) =>
    action$.pipe(
        filter(isActionOf(actions.loginAction)),
        tap(console.log),
        map(x => x.payload.user.split("@")[0]),
        mergeMap(user => ajax.getJSON<string>(`https://api.github.com/users/${user}`)),
        map(response => actions.loggedInAction(response))
    );

export default [
    loginEpic,
];
