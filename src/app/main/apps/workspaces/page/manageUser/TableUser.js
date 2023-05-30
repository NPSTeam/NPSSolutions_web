import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { openDialog } from 'app/store/fuse/dialogSlice';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchUsersInWorkspaceByPagination,
  assignUser,
  setListUserNotInCurrentWorkspace,
} from '../../store/manageUserInWorkspaceSlice';
import { setTargetWorkspace } from '../../store/workspacesSlice';
import AddExistUserToWorkspace from './components/AddExistUserToWorkspace';

const listRole = ['Member', 'Owner'];

const StyledTableBody = styled(TableBody)(({ theme }) => ({
  '& .MuiTableRow-root': {
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
    '&.Mui-selected': {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      color: theme.palette.primary.contrastText,
    },
  },
}));
// CSS for rowsPerPageOptions
const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  '& .MuiTablePagination-select': {
    minHeight: 'auto !important',
  },
}));
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// eslint-disable-next-line consistent-return
function stableSort(array, comparator) {
  if (array && array?.length) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
}

export default function TableUser() {
  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;

    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell, index) => (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ borderTopRightRadius: index === headCells.length - 1 && 16 }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={headCell.sortable ? createSortHandler(headCell.id) : undefined}
                hideSortIcon
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  const { t } = useTranslation('workspaces');
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const routeParams = useParams();

  const totalUsersInWorkspace = useSelector(
    (state) => state?.workspaces?.userInWorkspace?.totalUsersInWorkspace
  );
  const pageSize = useSelector((state) => state?.workspaces?.userInWorkspace?.pageSize);
  const pageIndex = useSelector((state) => state?.workspaces?.userInWorkspace?.pageIndex);
  const pilotId = useSelector((state) => state?.workspaces?.userInWorkspace?.targetId);

  const listUserInSystem = useSelector(
    (state) => state.workspaces.userInWorkspace.listUserInSystem
  );

  const listUsersByPagination = useSelector(
    (state) => state.workspaces.userInWorkspace.listUsersByPagination
  );

  // const location = useLocation();

  // const parts = location.pathname.split('/');
  // const targetWorkspaceId = parts[parts.length - 1];

  // useEffect(() => {
  //   dispatch(setTargetWorkspaceId(targetWorkspaceId));
  // }, [dispatch, targetWorkspaceId]);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);

  const headCells = [
    // {
    //   id: 'ID',
    //   numeric: false,
    //   disablePadding: false,
    //   sortable: true,
    //   label: ['ID'],
    //   align: 'center',
    // },
    {
      id: 'role',
      numeric: false,
      disablePadding: false,
      sortable: true,
      label: ['ROLE'],
      align: 'center',
    },
    {
      id: 'username',
      numeric: false,
      disablePadding: false,
      sortable: true,
      label: ['USERNAME'],
      align: 'center',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      sortable: true,
      label: ['EMAIL'],
      align: 'center',
    },
    {
      id: 'phoneNumber',
      numeric: false,
      disablePadding: false,
      sortable: true,
      label: ['PHONE'],
      align: 'center',
    },
    {
      id: 'birthDay',
      numeric: false,
      disablePadding: false,
      sortable: true,
      label: ['BIRTHDAY'],
      align: 'center',
    },
  ];

  // const location = useLocation();

  // const parts = location.pathname.split('/');
  // const targetWorkspace = parts[parts.length - 1];

  useEffect(() => {
    dispatch(
      fetchUsersInWorkspaceByPagination({ id: routeParams.id, pageIndex: 0, pageSize: 5, navigate })
    );
  }, [dispatch, navigate, routeParams.id]);

  const handleChangePage = (event, newPage) => {
    dispatch(
      fetchUsersInWorkspaceByPagination({ id: routeParams.id, pageIndex: newPage, navigate })
    );
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(
      fetchUsersInWorkspaceByPagination({
        id: routeParams.id,
        pageSize: event.target.value,
        navigate,
      })
    );
  };
  const isLoading = useSelector((state) => state.workspaces.userInWorkspace.isLoading);

  return (
    <>
      <Box sx={{ width: '100%', marginBottom: 0 }} className="ml-16 pr-32">
        <Paper sx={{ width: '100%', borderRadius: 4, overflow: 'hidden' }}>
          <div
            className="flex"
            style={{
              padding: '1rem 1.6rem',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: theme.palette.primary.main,
            }}
          >
            <Typography
              className="font-medium text-16"
              color={`${theme.palette.primary.contrastText}`}
            >
              {t('WORKSPACE_USER_MANAGEMENT')}
            </Typography>

            <Button
              component="button"
              role="button"
              variant="contained"
              onClick={() => {
                dispatch(setTargetWorkspace(routeParams.id));

                const newData = listUserInSystem.filter(
                  (obj) => !listUsersByPagination.some(({ userId }) => obj.id === userId)
                );
                dispatch(setListUserNotInCurrentWorkspace(newData));
                dispatch(
                  openDialog({
                    children: <AddExistUserToWorkspace />,
                  })
                );
              }}
              color="secondary"
              style={{ height: 40 }}
            >
              {t('UPDATE_WORKSPACE_USER')}
            </Button>

            {/* <Button
                component="button"
                role="button"
                variant="contained"
                color="secondary"
                style={{ height: 40 }}
                onClick={() => {
                  dispatch(openDialog({ children: <TestDialogSearch /> }));
                }}
              >
                {t('TEST_FIND')}
              </Button> */}
          </div>

          <>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={() => console.log(1)}
                  onRequestSort={() => console.log(1)}
                  rowCount={listUsersByPagination?.length}
                />

                {isLoading ? (
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                  </Box>
                ) : (
                  <StyledTableBody>
                    {stableSort(listUsersByPagination, getComparator(order, orderBy)) &&
                    stableSort(listUsersByPagination, getComparator(order, orderBy))?.slice(
                      0,
                      pageSize
                    )?.length ? (
                      stableSort(listUsersByPagination, getComparator(order, orderBy))
                        .slice(0, pageSize)
                        .map((row, index) => (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={`manage-user-list-${index}`}
                          >
                            {/* <TableCell align="center">{row.userId}</TableCell> */}
                            {/* <TableCell align="left">{row.email || row.phoneNumber}</TableCell> */}
                            <TableCell align="center">
                              <Select
                                labelId="assign-user-type-label"
                                id="assign-user-type-select"
                                label={t('TYPE')}
                                color="secondary"
                                defaultValue={row.type}
                                disabled
                                onChange={(event) => {
                                  dispatch(setTargetWorkspace(routeParams.id));

                                  const newRole = event.target.value;
                                  if (newRole !== row.type) {
                                    const newArrUser = listUsersByPagination.map((item) => {
                                      if (item.userId === row.userId) {
                                        return { ...item, type: newRole };
                                      }
                                      return item;
                                    });
                                    dispatch(
                                      assignUser({
                                        data: newArrUser,
                                        t,
                                      })
                                    );
                                  }
                                }}
                              >
                                {listRole?.length
                                  ? listRole.map((item, indexRoles) => (
                                      <MenuItem
                                        key={`key-select-add-use-${indexRoles}`}
                                        value={item}
                                      >
                                        {item}
                                      </MenuItem>
                                    ))
                                  : null}
                              </Select>
                            </TableCell>
                            <TableCell align="center">{row.username}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.phoneNumber}</TableCell>
                            <TableCell align="center">{row.birthDay}</TableCell>

                            {/* <TableCell align="center">
                            <Button
                              onClick={() => {
                                dispatch(setTargetWorkspace(routeParams.id));

                                console.log('row', row);
                                dispatch(setTargetWorkspaceUser(row));
                                dispatch(openDialog({ children: <UpdateWorkspaceUser /> }));
                              }}
                              role="button"
                              variant="text"
                              style={{ padding: 0 }}
                            >
                              <span className="mx-8">{t('UPDATE')}</span>
                            </Button>
                            <Button
                              onClick={() => {
                                dispatch(
                                  openDialog({
                                    children: <DeleteUserInWorkspace />,
                                  })
                                );
                                dispatch(setTargetWorkspaceUser(row));
                              }}
                              role="button"
                              variant="text"
                              color="error"
                              style={{ cursor: 'pointer' }}
                            >
                              {t('DELETE')}
                            </Button>
                          </TableCell> */}
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={headCells.length}>{t('NO_DATA_IN_TABLE')}</TableCell>
                      </TableRow>
                    )}
                  </StyledTableBody>
                )}
              </Table>
            </TableContainer>
            <StyledTablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalUsersInWorkspace}
              rowsPerPage={pageSize}
              page={pageIndex}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={t('ROWS_PER_PAGE')}
            />
          </>
        </Paper>
      </Box>
    </>
  );
}
