import { Chip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBoards,
  getUserRoleWorkspace,
  getWorkspace,
  selectBoards,
  setTargetWorkspace,
} from '../store/boardsSlice';
import BoardItem from './BoardItem';
import NewBoardItem from './NewBoardItem';

function Boards(props) {
  const dispatch = useDispatch();
  const getState = useSelector((state) => state);
  const boards = useSelector(selectBoards);
  const listWorkspace = useSelector(({ scrumboardApp }) => scrumboardApp.boards.listWorkspace);

  const targetWorkspace = useSelector(({ scrumboardApp }) => scrumboardApp.boards.targetWorkspace);

  console.log(listWorkspace);
  useEffect(() => {
    dispatch(getWorkspace({ dispatch }));
  }, [dispatch]);

  useEffect(() => {
    if (targetWorkspace) {
      dispatch(getBoards({ dispatch, getState }));
      dispatch(getUserRoleWorkspace({ dispatch, getState }));
    }
    // return () => {
    //   dispatch(resetBoards());
    // };
  }, [dispatch, targetWorkspace]);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const handleChipClick = (workspace) => {
    dispatch(setTargetWorkspace(workspace.workspaceId));
  };

  return (
    <>
      <div className="flex grow shrink-0 flex-col items-center container p-24 sm:p-40">
        <Typography
          sx={{
            fontSize: '2.6rem',
            fontWeight: '700',
            color: '#2563EB',
          }}
        >
          Choose your workspace:
        </Typography>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
          {listWorkspace.map((workspace) => (
            <Chip
              key={workspace.workspaceId}
              label={workspace.name}
              className="mr-8 mb-8"
              color="primary"
              onClick={() => handleChipClick(workspace)}
              variant={targetWorkspace === workspace.workspaceId ? 'default' : 'outlined'}
            />
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
          <Typography className="mt-16 md:mt-96 text-3xl md:text-6xl font-extrabold tracking-tight leading-7 sm:leading-10 text-center">
            Scrumboard Boards
          </Typography>
        </motion.div>
        {targetWorkspace && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mt-32 md:mt-64"
          >
            {boards.map((board) => (
              <motion.div
                variants={item}
                className="min-w-full sm:min-w-224 min-h-360"
                key={board.id}
              >
                <BoardItem board={board} key={board.id} />
              </motion.div>
            ))}

            <motion.div variants={item} className="min-w-full sm:min-w-224 min-h-360">
              <NewBoardItem />
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default Boards;
