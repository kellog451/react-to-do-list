import { useContext } from "react";
import Card from "../components/UI/Card";
import ListItemContext from "../store/List-Context";
import classes from "./Reminder.module.css";

const Reminders = () => {
  const listCtx = useContext(ListItemContext);

  const listItems = listCtx.listItems.filter((item) => {
    return item.setReminder === true;
  });

  const calculateDueDate = (dueDate) => {
    const currentDate = new Date();
    const listItemDate = new Date(dueDate);

    //get formatted year, month and date
    const utc1 = Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const utc2 = Date.UTC(
      listItemDate.getFullYear(),
      listItemDate.getMonth(),
      listItemDate.getDate()
    );

    const number_of_days = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
    return number_of_days;
  };


  const content = listItems.map((item) => {
    const dueIn = calculateDueDate(item.date);
    let dueContent;

    //checks days left & render dynamic data
    if(dueIn < 0){
      dueContent = <p className={classes.daysLeft}>Past</p>;
    }else if (dueIn > 0){
      dueContent = <p className={classes.daysLeft}>{dueIn} <span>Days to go</span></p>;
    }else{
      dueContent = <p className={classes.daysLeftDue}>Due Today</p>
    }
    return (
      <div key={item.id} className={classes.reminders}>
        <div className={classes.leftDiv}>
          <p>
            <span> {item.text}</span>
          </p>
          <p>
            Date: <span> {item.date}</span>
          </p>
        </div>

        <div className={classes.rightDiv}>
          <div className={classes.badge}>
            {dueContent}
          </div>
        </div>
      </div>
    );
  });

  return (
    <Card>
      <h1 className="centered">My Reminders</h1>
      <div className={classes.xxx}>{content}</div>
    </Card>
  );
};

export default Reminders;
