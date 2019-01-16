import axios from "axios";
import {
  FETCH_CURRENT_USER,
  FETCH_USERS,
  FETCH_USER,
  CLEAR_SELECTED_USER,
  FETCH_REQUESTS,
  FETCH_LECTURERS,
  FETCH_REQUEST
} from "./types";
import { build } from "search-params";

export const fetchCurrentUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_CURRENT_USER, payload: res.data });
};

export const fetchUsers = options => async dispatch => {
  const urlOptions = options ? build(options) : "";
  const res = await axios.get(`/api/user/all?${urlOptions}`);
  const users = res.data.entities;
  dispatch({ type: FETCH_USERS, payload: users });
};

export const fetchUser = id => async dispatch => {
  const res = await axios.get(`/api/user/id/${id}`);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateUser = (id, user, history, done) => async dispatch => {
  try {
    await axios.patch(`/api/user/id/${id}`, user);
    history.push("/admin/user");
    dispatch({ type: FETCH_USERS });
    done({});
  } catch(error) {
    console.log(error);
    done({error});
  }
};

export const createNewRequest = (request, history, done) => async dispatch => {
  try {
    console.log("REQ", request);
    const { name, attached_form, unit_leader } = request;
    var fd = new FormData(); // Since this is a request with a file, we'll need to use FormData
    fd.set("name", name);
    fd.set("unitLeader", unit_leader);
    fd.append("attachedForm", attached_form);
    await axios.post(`/api/requests`, fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    done({});
    history.push("/requests");
  } catch (error) {
    console.log(error);
    done({error});
  }
};

export const fetchLecturers = () => async dispatch => {
  try {
    const res = await axios.get("/api/requests/lecturers");
    const lecturers = res.data;
    dispatch({ type: FETCH_LECTURERS, payload: lecturers });
  } catch (err) {
    console.log(err);
  }
};

export const fetchRequests = () => async dispatch => {
  const res = await axios.get("/api/requests");
  dispatch({ type: FETCH_REQUESTS, payload: res.data });
};

export const fetchAllRequests = () => async dispatch => {
  const res = await axios.get("/api/requests/all");
  dispatch({ type: FETCH_REQUESTS, payload: res.data });
};

export const fetchRequest = id => async dispatch => {
  const res = await axios.get(`/api/requests/id/${id}`);
  dispatch({ type: FETCH_REQUEST, payload: res.data });
};

export const updateRequest = (id, request, done) => async dispatch => {
  try {
    const res = await axios.patch(`/api/requests/id/${id}`, request);
    dispatch({ type: FETCH_REQUEST, payload: res.data });
    done({});
  } catch(error) {
    console.log(error);
    done({error});
  }
}