import React, { forwardRef, useImperativeHandle } from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 270,
    marginBottom: theme.spacing(5),
  },
  paper: {
    position: 'absolute',
    width: "23%",
    minWidth: "fit-content",
    top: '50% !important',
    left: '50% !important',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '50px 50px 60px 50px',
    transform: "translate(-50%, -50%)"
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  media: {
    height: 250,
    [theme.breakpoints.down("sm")]: {
      height: 150,
    },
  },
  postContent: {
    minHeight: "14vh"
  },
  postTitle: {
    minHeight: "7vh"
  },
  postActions: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  postActionModal: {
    width: "fit-content",
    display: "grid",
    margin: "auto"
  },
  postModalTitle: {
    margin: "auto",
    paddingBottom: "30px",
    fontSize: "large",
    fontWeight: "500"
  },
  btnGroup: {
    marginTop: "10%",
    display: "flex",
    justifyContent: "center"
  },
  btns: {
    width: "40%",
    height: "90%"
  }
}));

const Post = forwardRef((props, ref) => {
  const { img, title, id, handlePostView } = props;
  const classes = useStyles();
  const [postTitle, setPostTitle] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [postModalTitle, setPostModalTitle] = React.useState("");
  const [isNewPost, setIsNewPost] = React.useState(false);

  const handleOpenModal = (isExistingPost) => {
    if (isExistingPost) {
      setIsNewPost(false);
      setPostTitle(title);
      setPostModalTitle('Update');
    } else {
      setIsNewPost(true);
      setPostTitle('');
      setPostModalTitle('Create New');
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlePostDetails = (actionType) => {
    const dataToUpadtePost = {
      titleToUpdate: postTitle,
      actionType: actionType
    }
    if (!isNewPost) dataToUpadtePost.id = id;
    props.handlePostDetails(dataToUpadtePost);
    setOpenModal(false);
  }

  useImperativeHandle(ref, () => ({
    handleOpenModal: handleOpenModal
  }));

  return (
    <>
      <Card className={classes.card} >
        <CssBaseline />
        <CardActionArea>
          <CardContent className={classes.postContent}>
            <Typography className={classes.postTitle} gutterBottom variant="h5">
              {title}
            </Typography>
            <Typography variant="body2">
              Due Date:
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.postActions}>
          <Button type="button" onClick={() => handleOpenModal(true)} size="small" color="primary">
            <EditIcon />
          </Button>
          <Button size="small" color="primary"
            onClick={() => handlePostView(title)}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
      <Modal
        open={openModal}
      >
        <div className={classes.paper}>
          <div className={classes.postActionModal}>
            <p className={classes.postModalTitle}>{postModalTitle} Board</p>
            <TextField required value={postTitle} onChange={(e) => setPostTitle(e.target.value)}>
            </TextField>
            <ButtonGroup className={classes.btnGroup} color="primary" aria-label="contained primary button group">
              <Button className={classes.btns} disabled={postTitle === ''} onClick={() => handlePostDetails('save')}>Save</Button>
              <Button className={classes.btns} style={{ color: "#c36928" }} onClick={() => handleCloseModal()}>cancel</Button>
              {isNewPost ? null : <Button onClick={() => handlePostDetails('delete')} className={classes.btns} style={{ color: "#de0000" }}>Delete</Button>}
            </ButtonGroup>
          </div>
        </div>
      </Modal>
    </>
  );
});

export default Post;