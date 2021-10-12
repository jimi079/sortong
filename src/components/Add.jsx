import {
  Button,
  Container,
  Fab,
  FormControlLabel,
  FormLabel,
  makeStyles,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  fab: {
    right: "26%",
    bottom: 35,
    position: "fixed"
  },
  container: {
    width: "25% !important",
    height: "min-content",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    }
  },
  form: {
    padding: theme.spacing(2),
  },
  item: {
    marginBottom: theme.spacing(3),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Add = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenAlert(false);
  };

  const handleSubmit = () => {
    props.handleBoardUpdation({
      title: title,
      desc: desc
    })
    setOpen(false);
    setOpenAlert(true);
    setUpdateStatus("success");
    setUpdateMessage("Board Updation Successful!");
    setTitle("");
    setDesc("");
  }

  return (
    <>
      <Tooltip title="Add" aria-label="add" onClick={() => setOpen(true)}>
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal open={open} className={classes.modal}>
        <Container className={classes.container}>
          <form className={classes.form} autoComplete="off">
            <div className={classes.item}>
              <TextField
                required={true}
                id="standard-basic"
                label="Title"
                size="small"
                style={{ width: "100%" }}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={classes.item}>
              <TextField
                required={true}
                id="outlined-multiline-static"
                multiline
                rows={4}
                placeholder="Describe your task"
                variant="outlined"
                label="Description"
                size="small"
                style={{ width: "100%" }}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className={classes.item}>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: 20 }}
                disabled={title == '' || desc == ''}
                onClick={() => handleSubmit()}
              >
                Create
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Container>
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity={updateStatus}>
          {updateMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Add;