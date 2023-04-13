import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postItem(action) {
    console.log('inside postitem saga',action.payload)
    try {
        yield axios.post('/api/shelf', action.payload)
        yield put({type: 'FETCH_SHELF'})
    }catch(error){
        console.log('error', error)
    }
}




function* postSaga(){
    yield takeLatest('ADD_ITEM', postItem)//this is what talks to root saga
}

export default postSaga;