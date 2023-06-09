import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchShelf() {
    try {
        const response = yield axios.get('/api/shelf');
        yield put({type: 'SET_SHELF', payload: response.data})
    }catch (error) {
        console.log('Error:', error);
    }
}


function* editShelf(action){
    try{
        yield axios.put(`/api/shelf/${action.payload.id}`, action.payload)//this is a actual put request
        yield put({type: 'FETCH_SHELF'})//this is a dispatch
    }catch(error){
        console.log(error)
    }}
function* deleteItem(action) {
    try {
        yield axios.delete(`/api/shelf/${action.payload}`);

        yield put({type: 'FETCH_SHELF'})
        
    }catch (error) {
        console.log('Error:', error);

    }
}

function* shelfSaga() {

    yield takeLatest('FETCH_SHELF', fetchShelf)
    yield takeLatest('EDIT_SHELF_ITEM', editShelf)
    yield takeLatest('DELETE_ITEM', deleteItem);

}

export default shelfSaga;