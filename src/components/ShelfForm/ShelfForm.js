import { useDispatch } from "react-redux";


function ShelfForm(){

   const  dispatch = useDispatch();


    const postItem = event => {
        event.preventDefault();
        dispatch({ type: 'ADD_ITEM'})

    }

    

    return (
        <form onSubmit={postItem}>
            <input placeholder="new Description"></input>
            <input placeholder="image url"></input>
            <button type='submit'>submit</button>
        </form>
    )
}

export default ShelfForm;