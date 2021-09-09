import Card from "../UI/Card";
import ListItem from "./ListItem";
import ListItemContext from "../../store/List-Context";
import { useContext,useState } from "react";
import classes from "./ToDoList.module.css";
import { NavLink } from "react-router-dom";

const ToDoList = (props) => {
  const listCtx = useContext(ListItemContext);
  const [isNew, setIsNew] = useState(false);

  const deleteItemHandler = (id) => {
    listCtx.deleteItem(id);
    setIsNew(!isNew);
    console.log(id);
  };

  const editItemHandler = (item) => {
    listCtx.editItem(item);
    setIsNew(!isNew);
  };

  const listItems = listCtx.listItems.map((item) => {
    return (
      <ListItem
        item={item}
        key={item.id}
        onDelete={deleteItemHandler}
        onEdit={editItemHandler}
      />
    );
  });

  return (
    <Card>
      <h1 className="centered">TO DO LIST</h1>
      <span className={classes.corner_btn}>
        <NavLink to='/new-item'>+</NavLink>
      </span>
      <div>{listItems}</div>
    </Card>
  );
};

export default ToDoList;
