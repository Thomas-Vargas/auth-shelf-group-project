import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShelfList() {

    const shelf = useSelector(store => store.shelfReducer);
    console.log(shelf);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_SHELF'})
    }, [])

    return(
        <ul>
            {shelf.length ? 
                shelf.map(item => (
                    <li key={item.id}>
                        {item.description}
                        <img src={item.image_url}/>
                    </li>
                ))
             : <li>Page loading...</li>
            }
        </ul>
    )
}

export default ShelfList;