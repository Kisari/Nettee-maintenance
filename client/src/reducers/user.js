const initialState = {
  statusbar: "",
  token: null,
  userData: null,
  authData: null,
  allUserData: [],
};
export default function userReducer(user = initialState, action) {
  switch (action.type) {
    case "FETCH_ALL_USER":
      return {
        ...user,
        allUserData: action?.payload,
      };
    case "CREATE":
      // return { ...user, userData: action?.payload };
      return {
        ...user,
        userData: action?.payload,
      };
    case "UPDATE_USER_DATA":
      return {
        ...user,
        allUserData: user.allUserData.filter((user) =>
          user._id === action?.payload._id ? action?.payload : user
        ),
      };
    case "AUTH":
      // localStorage.setItem("NETTEE_TOKEN", JSON.stringify({ ...action?.payload }));
      return {
        ...user,
        authData: JSON.stringify(action?.payload),
      };
    case "UPDATE_LIKE":
      return user;
    case "UPDATE_SHARE":
      return user;
    case "UPDATE_PIN":
      return user;
    default:
      return user;
  }
}
