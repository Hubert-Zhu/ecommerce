import { put, takeEvery } from "@redux-saga/core/effects";
import axios, { AxiosResponse } from "axios";
import { API } from "../../config";
import { getCategorySuccess, GET_CATEGORY, GET_CATEGORY_SUCCESS } from "../actions/category.action";
import { Category } from "../model.js/category";

function* handleGetCategory () {
  let response :AxiosResponse = yield axios.get<Category[]>(`${API}/categories`)
  yield put(getCategorySuccess(response.data))
}

export default function* categorySage() {
  yield takeEvery(GET_CATEGORY, handleGetCategory)
  yield
}