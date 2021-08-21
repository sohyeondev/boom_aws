import laco from "../../assets/img/lacotaco.png";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

function HomeBar() {
  const classes = useStyles();
  return (
    <div className={classes.homebar}>
      <Link to="/">
        <img src={laco} alt="라코타코" className={classes.img} />
      </Link>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  homebar: {
    width: "100%",
    background: "rgb(5, 63, 31)",
  },
  img: {
    width: "4em",
    height: "em",
  },
}));

export default HomeBar;
