import {ActionsObservable, StateObservable} from "redux-observable";
import {delay, filter, map, repeat, takeUntil} from 'rxjs/operators';

import {ActionType, isActionOf} from 'typesafe-actions';

import * as actions from "../actions";
import {RootState} from "../reducers";
import {of, from, merge} from "rxjs";

type Action = ActionType<typeof actions>;

function progressOnEpic(action$: ActionsObservable<Action>, store: StateObservable<RootState>) {
    let ofs = action$.pipe(
        filter(isActionOf([actions.loggedInAction, actions.loginFailureAction, actions.loadedAction,
            actions.epicSuccessAction, actions.epicFailureAction, actions.nodeConvertedAction, actions.nodeConversionErrorAction])),
        map(_ => false)
    );
    let ons = action$.pipe(
        filter(isActionOf([actions.loginAction, actions.refreshAction, actions.addTestNodeAction, actions.convertNodeAction])),
        map(_ => true),
        delay(1000),
        takeUntil(ofs),
        repeat()
    );
    return merge(ons, ofs).pipe(
        map(value => actions.progressAction(value)),
    );
}

export default [
    progressOnEpic
];
