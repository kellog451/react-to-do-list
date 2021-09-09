import { NavLink } from "react-router-dom";
import Card from "../components/UI/Card";
import classes from './PageNotFound.module.css';

const Home = () => {
  return (
    <Card>
      <section className={classes.page_404}>
        <div className={classes.container}>
          <div className={classes.row}>
            <div className={classes['col-sm-12']}>
              <div className={classes['col-sm-10 col-sm-offset-1  text-center']}>
                <div className={classes['four_zero_four_bg']}>
                  <h1 className={classes['text-center']}>404</h1>
                </div>

                <div className={classes['contant_box_404']}>
                  <h3 className={classes.h2}>Look like you're lost</h3>

                  <p>The page you are looking for is not avaible!</p>

                  <NavLink to="/home" className={classes.link_404}>
                    Go to Home
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Card>
  );
};

export default Home;
