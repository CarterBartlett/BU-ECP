import { FETCH_REQUESTS, FETCH_REQUEST } from "../actions/types";

const defaultState = { list: false, selected: null };

export default function(state = defaultState, action) {
  switch (action.type) {
    case FETCH_REQUESTS:
      return {
        list: action.payload
      };
    case FETCH_REQUEST:
      return {
        selected: action.payload || false
      };
    default:
      return state;
  }
}
