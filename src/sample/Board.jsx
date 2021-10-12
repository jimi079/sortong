import React, { useState, useEffect } from "react";
import { Container, makeStyles, Grid } from "@material-ui/core";
import { DragDropContext } from "react-beautiful-dnd";
import CssBaseline from '@material-ui/core/CssBaseline';

//importing customised components
import Column from "./Column";
import Add from "../components/Add";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
  addBoard: {
    right: '30%',
    bottom: '35px',
    position: 'fixed'
  },
  boardTitle: {
    textAlign: "center",
    padding: "40px",
    fontSize: "2.2em",
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`
  }
}));

let initialColumns = {
  Pending: {
    id: "Pending",
    list: [
      { id: "1", text: "text1" },
      { id: "2", text: "text2" },
      { id: "3", text: "text3" }
    ]
  },
  Doing: {
    id: "Doing",
    list: [
      { id: "4", text: "text4" },
      { id: "5", text: "text5" },
      { id: "6", text: "text6" }
    ]
  },
  Completed: {
    id: "Completed",
    list: [
      { id: "7", text: "text4" },
      { id: "8", text: "text5" },
      { id: "9", text: "text6" }
    ]
  }
};

const Board = (props) => {
  const classes = useStyles();
  const [columns, setColumns] = useState(initialColumns);
  const [boardDesc, setBoardDesc] = useState("");
  const [boardTitle, setBoardTitle] = useState(props.boardTitle)

  const handleBoardUpdation = (data) => {
    const { title, desc } = data;

    if (title) {
      let existingColumns = initialColumns;
      let list = existingColumns.Pending.list;
      list.push({
        id: list[list.length - 1].id,
        text: title
      })
      setColumns(existingColumns);
      // Now here, hit the backend api for updating the board's pending list to the DB.
    }

    if (desc) {
      setBoardDesc(desc);
      // Now here, hit the backend api for updating the board's title to the DB.
    }
  }


  /*
    TODO: 
      each column has to have a unique id, each item has to have a unique id and ideally consecutive else funky things happen
      each droppable has to have a unique id, each draggable also - cannot stress this enough because that is the only way
      the framework knows how what went from which list
    */

  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      console.log(start);
      const newList = start.list.filter((_, idx) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index);

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol
      }));
      return null;
    }
  };

  return (
    <Container className={classes.container} justify="center">
      <div className={classes.boardTitle}>
        {boardTitle}
      </div>
      <CssBaseline />
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container direction={"row"} justify={"center"}>
          {Object.values(columns).map((column) => {
            return (
              <Grid item>
                <Column column={column} key={column.id} />
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
      <div >
        <Add handleBoardUpdation={handleBoardUpdation} className={classes.addBoard} val={true} />
      </div>
    </Container>
  );
};

export default Board