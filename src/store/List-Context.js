import { createContext, useReducer } from "react";

const itemsArray = [
  {
    id: "td1",
    text: "Learn React JS & Next JS",
    date: "2021-09-15",
    setReminder: true,
  },
  {
    id: "td2",
    text: "Hike Mount. Kilimanjaro",
    date: "2021-10-18",
    setReminder: false,
  },
  {
    id: "td3",
    text: "Go cycling in the hills",
    date: "2021-11-15",
    setReminder: false,
  },
];

/* let itemsArray = [];

const fetchToDoList = async () => {
  try {
    const response = await fetch(
      "https://react-movies-238f9-default-rtdb.firebaseio.com/to_do_list.json"
    );

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();

    //const itemsArray = [];

    for(const key in data){
      const obj = {
        id: key,
        ...data[key],
      }
      itemsArray.push(obj);
    }

  } catch (error) {
    console.log(error);
  }

};

fetchToDoList(); 
const sendRequest = async (body, method) => {
  try {
    const response = await fetch(
      "https://react-movies-238f9-default-rtdb.firebaseio.com/to_do_list.json",
      {
        method: method,
        body: JSON.stringify(body),
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

*/

//create context to store app wide list state/data
const ListItemContext = createContext({
  listItems: itemsArray,
  addItem: (item) => {},
  deleteItem: (id) => {},
  editItem: (item) => {},
  setReminder: (item) => {},
});

const listReducer = (state, action) => {
  if (action.type === "ADD ITEM") {
    state.push(action.value);
    return state;
  }
  if (action.type === "DELETE ITEM") {
    const itemIndex = state.findIndex((item) => item.id === action.value);
    state.splice(itemIndex, 1);

    //sendRequest(state,'PUT');
    return state;
  }
  if (action.type === "EDIT ITEM") {
    const itemIndex = state.findIndex((item) => item.id === action.value.id);
    state[itemIndex] = action.value;
    //sendRequest(state,'PUT');
    return state;
  }
  if (action.type === "SET REMINDER") {
    const itemIndex = state.findIndex((item) => item.id === action.value.id);
    state[itemIndex].setReminder = action.value.checkedState;
    return state;
  }

  return itemsArray;
};

//create a context provider to define context updating methods.
export const ListContextProvider = (props) => {
  const [listState, dispatchListAction] = useReducer(listReducer, itemsArray);

  //add Item
  const addItemHandler = (item) => {
    dispatchListAction({
      type: "ADD ITEM",
      value: item,
    });
    console.log("Added Item ------->");
  };

  //delete list item
  const deleteItemHandler = (id) => {
    dispatchListAction({
      type: "DELETE ITEM",
      value: id,
    });
    console.log("Delete Item ------->");
  };

  //edit list item
  const editItemHandler = (item) => {
    dispatchListAction({
      type: "EDIT ITEM",
      value: item,
    });
    console.log("Edit Item ------->");
  };

  //edit list item
  const setReminderItemHandler = (checked) => {
    dispatchListAction({
      type: "SET REMINDER",
      value: checked,
    });
    console.log("Edit Item ------->");
  };

  const contextData = {
    listItems: listState,
    addItem: addItemHandler,
    deleteItem: deleteItemHandler,
    editItem: editItemHandler,
    setReminder: setReminderItemHandler,
  };

  return (
    <ListItemContext.Provider value={contextData}>
      {props.children}
    </ListItemContext.Provider>
  );
};

export default ListItemContext;
