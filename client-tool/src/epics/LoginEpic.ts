import {Epic} from "redux-observable";
import {ActionType, isActionOf} from 'typesafe-actions';

import {filter, map, mergeMap} from 'rxjs/operators';

import * as actions from "../actions";
import {RootState} from "../reducers";
import {Keeper} from "../service/Keeper";

type Action = ActionType<typeof actions>;

const loginEpic: Epic<Action, Action, RootState> = (action$, store) =>
    action$.pipe(
        filter(isActionOf(actions.loginAction)),
        mergeMap(x => Keeper.login(store.value.login.user!, x.payload.password)),
        map(actions.loggedInAction)
    );

export default [
    loginEpic,
];
