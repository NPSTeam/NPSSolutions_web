import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { reorderList, selectTasks } from './store/tasksSlice';
import TaskListItem from './TaskListItem';
import SectionListItem from './SectionListItem';

function TasksList(props) {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  if (!tasks) {
    return null;
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="text.secondary" variant="h5">
          There are no tasks!
        </Typography>
      </div>
    );
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
    // const taskDragged = tasks.find((item) => item.id === Number(result.draggableId));

    // const taskDraggedIndex = tasks[result.destination.index].order;

    // dispatch(updateTask({ ...taskDragged, order: taskDraggedIndex }));
    // dispatch(
    //   reorderList({
    //     arr: tasks,
    //     startIndex: result.source.index,
    //     endIndex: result.destination.index,
    //   })
    // );
    const newArr = Array.from(tasks);
    newArr.splice(result.destination.index, 0, newArr.splice(result.source.index, 1)[0]);

    const newBody = newArr.map((item, index) => {
      return { taskId: item.id, order: index };
    });
    dispatch(reorderList({ body: newBody }));
    //
    //  dispatch(updateTask(newArr))
  }
  return (
    <List className="w-full m-0 p-0">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list" type="list" direction="vertical">
          {(provided) => (
            <>
              <div ref={provided.innerRef}>
                {tasks.map((item, index) => {
                  if (item.type === 'task') {
                    return <TaskListItem data={item} index={index} key={item.id} />;
                  }

                  if (item.type === 'section') {
                    return <SectionListItem key={item.id} index={index} data={item} />;
                  }

                  return null;
                })}
              </div>
              {provided.placeholder}
            </>
          )}
        </Droppable>
      </DragDropContext>
    </List>
  );
}

export default TasksList;
