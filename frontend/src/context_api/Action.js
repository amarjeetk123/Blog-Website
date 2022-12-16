
export const LoginStart = (userCredentials)  => ({
    type: "LOGIN_START"
})

export const LoginSuccess = (user)  => ({     // we can remove (user) but it is good practice to write here
    type: "LOGIN_SUCCESS",
    payload: user,
})

export const LoginFailure = ()  => ({
    type: "LOGIN_FAILURE"
})



export const Logout = ()  => ({
    type: "LOGOUT"
})



export const UpdateStart = (userCredentials) => ({
    type: "UPDATE_START",
  });
  
  export const UpdateSuccess = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user,
  });
  
  export const UpdateFailure = () => ({
    type: "UPDATE_FAILURE",
  });