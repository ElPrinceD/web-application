import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

interface myProps {
  loading: boolean;
}

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb(0, 0, 0, .4)",
    zIndex: 9999,
  },
  circularContainer: {
    position: "absolute",
    left: "50%",
    top: "40%",
    transform: "translate(-50%, -50%)",
  },
}));

export default function Loader(props: myProps) {
  const classes = useStyles();
  console.log("Loader component: props.loading =", props.loading, "type:", typeof props.loading);
  
  if (!props.loading) {
    console.log("Loader: Not loading, returning null");
    return null;
  }
  
  console.log("Loader: Loading, showing spinner");
  return (
    <div className={classes.root}>
      <div className={classes.circularContainer}>
        <CircularProgress />
      </div>
      {/* Debug info - remove after testing */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'red',
        color: 'white',
        padding: '5px',
        fontSize: '12px',
        zIndex: 10000
      }}>
        LOADER VISIBLE - props.loading = {props.loading.toString()}
      </div>
    </div>
  );
}
