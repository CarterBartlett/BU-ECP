import { FETCH_USERS, FETCH_USER, CLEAR_SELECTED_USER, FETCH_LECTURERS } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        list: action.payload || false
      };
    case FETCH_USER:
      return {
        selected: action.payload || false
      };
    case CLEAR_SELECTED_USER:
      return {
        selected: null
      }
    case FETCH_LECTURERS:
      return {
        lecturers: action.payload
      }
    default:
      return state;
  }
}
