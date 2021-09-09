import { Fragment } from "react";
import ToDoList from "./components/List/TodoList";
import MainNavigation from "./components/MainNavigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Reminders from "./pages/Reminders";
import PageNotFound from './pages/PageNotFound';
import NewListItem from "./pages/NewListItem";

function App() {
  return (
    <Fragment>
      <MainNavigation />
      <main>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/list'>
            <ToDoList />
          </Route>
          <Route path='/new-item'>
            <NewListItem />
          </Route>
          <Route path='/reminders'>
            <Reminders />
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
