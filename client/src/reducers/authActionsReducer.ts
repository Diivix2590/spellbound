import ActionTypeKeys, { ActionTypeStates } from '../actions/ActionTypeKeys';
import ActionTypes from '../actions/ActionTypes';
import { initialState } from '../store/initialState';

export default function authActionsReducer(state = initialState.isAuthenticated, action: ActionTypes): boolean {
  if (action.type === ActionTypeKeys.SIGNOUT_SUCCESS) {
    return false;
  } else if (actionTypeEndsInSuccess(action.type)) {
    return true;
  } else if (actionTypeEndsInUnauthorised(action.type) || actionTypeIsSignInOrSignOutFail(action.type)) {
    return false;
  } else {
    return state;
  }
}

function actionTypeEndsInSuccess(type: ActionTypeKeys): boolean {
  const success = ActionTypeStates.SUCCESS;
  return type.substring(type.length - success.length) === success;
}

function actionTypeEndsInUnauthorised(type: ActionTypeKeys): boolean {
  const unauthorised = ActionTypeStates.UNAUTHORISED;
  return type.substring(type.length - unauthorised.length) === unauthorised;
}

function actionTypeIsSignInOrSignOutFail(type: ActionTypeKeys): boolean {
  return type === ActionTypeKeys.SIGNIN_FAIL || type === ActionTypeKeys.SIGNOUT_FAIL;
}
