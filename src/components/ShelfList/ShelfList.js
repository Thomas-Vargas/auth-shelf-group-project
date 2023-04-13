import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShelfList() {
  const shelf = useSelector((store) => store.shelfReducer);
  const user = useSelector((store) => store.user);
  console.log(shelf);
  console.log("User:", user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_SHELF" });
  }, []);

  const render = () => {
    return shelf.length ? (
      shelf.map((item) => (
        <li key={item.id}>
          {item.description}
          <img src={item.image_url} />
          {item.user_id === user.id ? (
            <div>
              <button>Edit</button>
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
