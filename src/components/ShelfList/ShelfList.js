import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function ShelfList() {
    const shelf = useSelector((store) => store.shelfReducer);
    const user = useSelector((store) => store.user);
    console.log(shelf);
    console.log("User:", user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "FETCH_SHELF" });
    }, []);

    const [idToEdit, setIdToEdit] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newImage, setNewImage] = useState('')

    function addInputField(item) {

       setIdToEdit(item.id)
       setNewDescription(item.description)//this autogenerate the edit input field of the input field youre trying to edit
       setNewImage(item.image_url)
       
    }

    function updateItem(id){
        let updatedItem = {
            description: newDescription,
            image_url: newImage,
            id
        }

        dispatch({
            type: 'EDIT_SHELF_ITEM',
            payload: updatedItem
        })
        setIdToEdit('')
    }

    const render = () => {
        return shelf.length ? (
            shelf.map((item) => (
                <li key={item.id}>
                    {item.description}
                    <img src={item.image_url} />
                    {item.user_id === user.id ? (
                        <div>
                            {/* this means if true do this, else do that */}
                            {/* this onClick resets the state every time to make it match the item id that is clicked on */}
                            {/* if item.id matches idtedit show inout fields otherwise show edit button  */}

                            {idToEdit === item.id ? <div>
                                {/* these are inline functions, they do the same as making a function above */}
                                <input value={newDescription}onChange={(event)=> setNewDescription(event.target.value)}></input>
                                <input value={newImage} onChange={(event)=> setNewImage(event.target.value)}></input>
                                <button onClick={()=>updateItem(item.id)}>Save changes</button>
                            </div>: <button onClick ={()=> addInputField(item)}>edit</button>}
                            <button>Delete Me</button>
                        </div>
                    ) : (
                        <></>
                    )}
                </li>
            ))
        ) : (
            <li>Page loading...</li>
        );
    };

    return <ul>{render()}</ul>;
}

export default ShelfList;
