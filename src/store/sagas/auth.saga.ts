import { put, takeEvery } from "redux-saga/effects"
import { SIGNUP, SIGNIN,  SignupAction, signupFail, signupSuccess, SigninAction, signinSuccess, signinFail } from "../actions/auth.action"
import axios, {AxiosResponse} from "axios"
import { API } from "../../config"

function* handleSignup(action: SignupAction) {
    console.log("handleSignup")
    try {
        yield axios.post(`${API}/signup`, action.payload)
        yield put(signupSuccess())
    } catch (error) {
        yield put(signupFail(error.response.data.error))
    }
}

function* handleSignin (action: SigninAction) {
   try{
        console.log(action.payload)
        let response : AxiosResponse = yield axios.post(`${API}/signin`, action.payload)
        localStorage.setItem('jwt', JSON.stringify(response.data))
        yield put(signinSuccess())
   } catch (error) {
        yield put(signinFail(error.response.data.error))
   }
}

export default function* authSaga() {
    yield takeEvery(SIGNUP, handleSignup)
    yield takeEvery(SIGNIN, handleSignin)
}