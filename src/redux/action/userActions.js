import { FETCH_USER_LOGIN_SUCCESS } from "./constants"

export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data
    }
}