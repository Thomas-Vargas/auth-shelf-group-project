import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postItem() {
    console.log('inside postitem saga')



}




function* postSaga(){
    yield takeLatest('ADD_ITEM', postItem)
}

export default postSaga;