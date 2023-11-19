export const updateUser = (obj) => {
  return {
    type: "user/update",
    payload: obj,
  };
};

export const registerUser = (obj) => {
  return {
    type: "user/register",
    payload: obj,
  };
};
