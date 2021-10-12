import {
  Grid,
  Container,
  makeStyles,
  Button,
  Snackbar
} from "@material-ui/core";
import Post from "./Post";
import AddIcon from '@material-ui/icons/Add';
import Board from "../sample/Board";
import React, { useState, useCallback, useRef } from "react";
import MuiAlert from "@material-ui/lab/Alert";

const postList = [
  { id: "9v8fga", title: "Choose the perfect design", img: "https://images.pexels.com/photos/7319337/pexels-photo-7319337.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
  { id: "8lct7o", title: "Simply Recipes Less Stress. More Joy", img: "https://images.pexels.com/photos/7363671/pexels-photo-7363671.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
  { id: "qc8tc4", title: "What To Do In London", img: "https://images.pexels.com/photos/7245535/pexels-photo-7245535.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
  { id: "mr4yek", title: "Recipes That Will Make You Crave More", img: "https://images.pexels.com/photos/7245477/pexels-photo-7245477.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
  { id: "zlsb4l", title: "Shortcut Travel Guide to Manhattan", img: "https://images.pexels.com/photos/7078467/pexels-photo-7078467.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" },
  { id: "uiobgh", title: "Killer Actions to Boost Your Self-Confidence", img: "https://images.pexels.com/photos/7833646/pexels-photo-7833646.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" }
]
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
  boardsGridContainer: {
    justifyContent: "space-around"
  },
  addNewPost: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    fontSize: "larger",
    border: "1px solid #c4c4c4",
    width: "fit-content",
    height: "31px",
    margin: "40px auto",
    cursor: "pointer"
  }
}));

const Feed = () => {
  const classes = useStyles();
  const childRef = useRef();
  const [, updateState] = useState();
  const [isPostView, setPostView] = useState(true);
  const [boardTitle, setBoardTitle] = useState('');
  const [posts, setPosts] = useState(postList);
  const [openAlert, setOpenAlert] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const forceUpdate = useCallback(() => updateState({}), []);

  const handlePostView = (title) => {
    setBoardTitle(title);
    setPostView(false);
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenAlert(false);
  };

  const handlePostDetails = ({ actionType, id, titleToUpdate }) => {
    let updatedPosts = posts;
    let postUpdateMessage = '';
    if (actionType === 'save') {
      if (id) {
        updatedPosts.map(post => {
          if (post.id === id) post['title'] = titleToUpdate;
        })
        postUpdateMessage = "Post Updated!"
      } else {
        const newId = (Math.random() + 1).toString(36).substring(6);
        const newPost = {
          id: newId,
          title: titleToUpdate,
          img: ''
        }
        updatedPosts.push(newPost);
        postUpdateMessage = "New Post Created!"
      }
      setUpdateStatus("success");
    } else if (actionType === 'delete') {
      updatedPosts = updatedPosts.filter((post) => post.id != id);
      setUpdateStatus("error");
      postUpdateMessage = "Post Deleted!"
    }
    setPosts(updatedPosts);
    forceUpdate();
    setOpenAlert(true);
    setUpdateMessage(postUpdateMessage);

    // Now here, hit the backend API for updating the Post(s) details to the DB.

  }

  return (
    <>
      {isPostView
        ?
        <Container className={classes.container} display="inline">
          <div
            style={{
              color: "black",
              marginTop: 10,
              marginBottom: 20,
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
            }}>
            <p>My Current Projects</p>
          </div>
          <Button className={classes.addNewPost} onClick={() => childRef.current.handleOpenModal()}>
            <AddIcon /> &nbsp;Add New
          </Button>
          <Grid container className={classes.boardsGridContainer}>
            {posts.map(post =>
              <Grid>
                <Post
                  ref={childRef}
                  id={post.id}
                  img={post.img}
                  title={post.title}
                  handlePostView={handlePostView}
                  handlePostDetails={handlePostDetails}
                />
              </Grid>
            )}
          </Grid>
        </Container>
        :
        <Board boardTitle={boardTitle} />
      }
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MuiAlert onClose={handleCloseAlert} severity={updateStatus} elevation={6} variant="filled">
          {updateMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Feed;