import { useContext, useRef } from "react";
import Card from "../components/UI/Card";
import classes from "./NewListItem.module.css";
import ListItemContext from "../store/List-Context";
import { useHistory } from "react-router-dom";

const NewListItem = () => {
  const itemInputRef = useRef();
  const dateInputRef = useRef();
  const history = useHistory();

  const listCtx = useContext(ListItemContext);

  const submitFormHandler = (event) => {
    event.preventDefault();

    let item_text, item_date;

    if (itemInputRef.current.value.length !== 0) {
      item_text = itemInputRef.current.value;
    }

    if (dateInputRef.current.value) {
      item_date = dateInputRef.current.value;
    }

    const newItem = {
      id: Math.random(),
      text: item_text,
      date: item_date,
      setReminder: false,
    };

    listCtx.addItem(newItem);
    sendRequest(newItem);
    history.push("/list");
  };

  const sendRequest = async (newItem) => {
    try {
      const response = await fetch(
        "https://react-movies-238f9-default-rtdb.firebaseio.com/to_do_list.json",
        {
          method: "POST",
          body: JSON.stringify(newItem),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor="new-item">New List Item</label>
          <input type="text" ref={itemInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="date">Date</label>
          <input type="date" ref={dateInputRef} />
        </div>
        <div className={classes.action}>
          <button>Add Item</button>
        </div>
      </form>
    </Card>
  );
};

export default NewListItem;
