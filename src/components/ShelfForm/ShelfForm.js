import { useDispatch } from "react-redux";
import { useState } from "react";


function ShelfForm() {

    //we used an object with two properties as the state and a switch statement to add the input value to both properties
    let [newItem, setNewItem] = useState({ description: '', image_url: '' });
    const dispatch = useDispatch();


    const handleItem = (event) => {
        console.log('value from input:', event.target.value)
        let targetInputField = event.target.id;
        switch (targetInputField) {
            case '1':
                setNewItem({ ...newItem, description: event.target.value })
                break;
            case '2':
                setNewItem({ ...newItem, image_url: event.target.value })
                break;
            default:
                console.log('missing input')
                break;
        }
        console.log('newitem:', newItem)
    }


    const postItem = event => {
        event.preventDefault();
        if (newItem.description && newItem.image_url) {
            dispatch({ type: 'ADD_ITEM', payload: newItem })
        }
        else {
            alert('Please fill out both inputs!')
        }
    }



    return (
        <form onSubmit={postItem}>
            <input id='1' placeholder="new Description" value={newItem.description} onChange={handleItem}></input>
            <input id='2' placeholder="image url" value={newItem.image_url} onChange={handleItem}></input>
            <button type='submit'>submit</button>
        </form>
    )
}

export default ShelfForm;