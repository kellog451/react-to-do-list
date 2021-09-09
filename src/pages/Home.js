import { NavLink } from "react-router-dom";
import Card from "../components/UI/Card";


const Home = () => {
  return (
    <Card>
      <h1 className='centered'>Welcome</h1>
      <p>Create Your Custom To Do List</p>
      <NavLink to='/list' className='btn'>Create List</NavLink>
    </Card>
  );
};

export default Home;