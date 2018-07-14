import { ISpellsWithFilters } from "models";
import keys from "../../ActionTypeKeys";

export interface IGetLightSpellsWithFiltersSuccessAction {
  readonly type: keys.GET_LIGHTSPELLSWITHFILTERS_SUCCESS;
  readonly payload: ISpellsWithFilters;
}

export interface IGetLightSpellsWithFiltersInProgressAction {
  readonly type: keys.GET_LIGHTSPELLSWITHFILTERS_INPROGRESS;
}

export interface IGetLightSpellsWithFiltersFailAction {
  readonly type: keys.GET_LIGHTSPELLSWITHFILTERS_FAIL | keys.GET_LIGHTSPELLSWITHFILTERS_UNAUTHORISED;
  readonly payload: {
    readonly error: Error;
  };
}