import classes from "./ListItem.module.css";
import Button from "react-bootstrap/Button";
import { useRef, useState, useContext } from "react";
import ListItemContext from "../../store/List-Context";

const ListItem = (props) => {
  //create context variable
  const listCtx = useContext(ListItemContext);
  const [editingItem, setEditingItem] = useState(false);
  const [editingFinished, setEditingFinished] = useState(false);
  const textInputRef = useRef();
  const dateInputRef = useRef();
  const { item } = props;

  const editItemHandler = () => {
    //call context mtd to edit item, pass item
    setEditingItem(true);
  };

  const submitUpdateHandler = (event) => {
    event.preventDefault();
    //call context mtd to edit item, pass
    const updatedItem = {
      id: item.id,
      text: textInputRef.current.value,
      date: dateInputRef.current.value,
      setReminder: false,
    };
    props.onEdit(updatedItem);
    setEditingFinished(true);
    setEditingItem(false);
  };

  const deleteItemHandler = () => {
    //call context method to delete item, pass id
    props.onDelete(item.id);
  };

  const cancelUpdateHandler = () => {
    setEditingItem(false);
  };

  const reminderChangeHandler = (event) => {
    const itemToUpdate = {
      id: item.id,
      checkedState: event.target.checked
    }

    listCtx.setReminder(itemToUpdate);
  }

  return (
    <li className={classes.listItem}>
      {editingItem && !editingFinished && (
        <form className={classes.form} onSubmit={submitUpdateHandler}>
          <div className={classes.control}>
            <label>
              Item Name
              <input
                type="text"
                placeholder={item.text}
                ref={textInputRef}
                required
              />
            </label>
          </div>

          <div className={classes.control}>
            <label>
              Date
              <input type="date" ref={dateInputRef} required />
            </label>
          </div>

          <Button type="submit" variant="outline-primary">
            Update
          </Button>
          <Button onClick={cancelUpdateHandler} variant="outline-secondary">
            Cancel
          </Button>
        </form>
      )}

      {!editingItem && (
        <div>
          <div className={classes.outputDiv}>
            <span className={classes.textSpan}>{item.text}</span>
            <span className={classes.dateSpan}>{item.date}</span>
          </div>

          <div className={classes.actionsDiv}>
            <label className={classes.switch}>
              {item.setReminder && (
                <input type="checkbox" title="Set Reminder" onChange={reminderChangeHandler} defaultChecked />
              )}
              {!item.setReminder && (
                <input type="checkbox" title="Set Reminder" onChange={reminderChangeHandler}/>
              )}
              <span className={classes.slider}></span>
            </label>
            <Button variant="outline-danger" onClick={deleteItemHandler}>
              Delete
            </Button>
            <Button variant="outline-primary" onClick={editItemHandler}>
              Edit
            </Button>
          </div>
        </div>
      )}

      {/*  {!editingItem && !editingFinished && (
        <Button variant="outline-primary" onClick={editItemHandler}>
          Edit
        </Button>
      )}
      {editingItem && (
        <Button variant="outline-primary" onClick={updateItemHandler}>
          Update
        </Button>
      )} */}
    </li>
  );
};

export default ListItem;
