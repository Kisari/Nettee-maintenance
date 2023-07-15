import * as api from "../api/user";

export const getAllUser = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUser();

    const action = { type: "FETCH_ALL_USER", payload: data.data.userData };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const createNewUser = (newUser, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createNewUser(newUser);

    const action = { type: "CREATE", payload: data.data.user };
    dispatch(action);

    navigate("/login", { replace: true });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (userID, userData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(userID, userData);

    const action = { type: "UPDATE_USER_DATA", payload: data.data.userData };
    dispatch(action);

    navigate("/home", { replace: true });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.loginUser(formData);

    const action = { type: "AUTH", payload: data };
    dispatch(action);

    // navigate('/home', { replace: true });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const likeThread = (token, thread_id) => async (dispatch) => {
  try {
    const { data } = await api.likeThread(token, thread_id);

    const action = { type: "UPDATE_LIKE", payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const shareThread =
  (thread_id, shareUserID, navigate) => async (dispatch) => {
    try {
      const { data } = await api.shareThread(thread_id, shareUserID);

      const action = { type: "UPDATE_SHARE", payload: data };
      dispatch(action);

      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

export const pinThread = (token, thread_id) => async (dispatch) => {
  try {
    const { data } = await api.pinThread(token, thread_id);

    const action = { type: "UPDATE_PIN", payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};
