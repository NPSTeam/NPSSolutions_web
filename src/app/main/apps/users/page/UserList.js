import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  TablePagination,
  Tooltip,
  CircularProgress,
  SwipeableDrawer,
  CardContent,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { openDialog } from 'app/store/fuse/dialogSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import exportExcel from 'src/assets/icon/exportExcel.svg';
import add from 'src/assets/icon/add.svg';
import update from 'src/assets/icon/update.svg';
import importIcon from 'src/assets/icon/importIcon.svg';
import deleteIcon from 'src/assets/icon/deleteIcon.svg';
import { motion } from 'framer-motion';

import {
  setUsersByPagination,
  setTargetUser,
  setIsEditUser,
  exportUser,
  importUser,
  getListUserSkill,
} from '../store/usersSlice';
import AddUpdateUser from './dialog/AddUpdateUser';
import DeleteUser from './dialog/DeleteUser';
import CreateUserForm from './CreateUserForm';

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

function UserList() {
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

  const { t } = useTranslation('users');
  const theme = useTheme();
  const dispatch = useDispatch();

  const totalUser = useSelector((state) => state.users.users.totalUser);
  const pageSize = useSelector((state) => state.users.users.pageSize);
  const pageIndex = useSelector((state) => state.users.users.pageIndex);
  const isLoadingListUser = useSelector((state) => state.users.users.isLoadingListUser);

  const listUserByPagination = useSelector((state) => state.users.users.listUserByPagination);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);

  const headCells = [
    {
      id: 'Username',
      numeric: false,
      disablePadding: false,
      label: t('USERNAME'),
      align: 'left',
      sortable: true,
    },
    {
      id: 'Email',
      numeric: false,
      disablePadding: false,
      label: t('Email'),
      align: 'left',
      sortable: true,
    },
    {
      id: 'Phone',
      numeric: false,
      disablePadding: false,
      label: t('PHONE'),
      align: 'left',
      sortable: true,
    },
    {
      id: 'Birthday',
      numeric: false,
      disablePadding: false,
      label: t('BIRTHDAY'),
      align: 'left',
      sortable: true,
    },
    {
      id: 'Locked',
      numeric: false,
      disablePadding: false,
      label: t('LOCKED'),
      align: 'left',
      sortable: true,
    },

    {
      id: 'Action',
      numeric: false,
      disablePadding: false,
      label: t('ACTION'),
      align: 'center',
      sortable: false,
    },
  ];

  useEffect(() => {
    dispatch(setUsersByPagination());
    dispatch(getListUserSkill());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    dispatch(setUsersByPagination({ pageIndex: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setUsersByPagination({ pageSize: event.target.value }));
  };

  const importFile = useRef();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleImportUser = async () => {
    setSelectedFile(importFile.current.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(importFile.current.files[0]);

    const base64 = await new Promise((resolve) => {
      reader.onload = () => {
        resolve(reader.result);
      };
    });

    dispatch(importUser(base64));
  };

  const [sidebarOpen, setSidebarOpen] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSidebarOpen({ ...sidebarOpen, [anchor]: open });
  };

  return (
    <>
      {isLoadingListUser ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
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
                {t('USER_MANAGEMENT')}
              </Typography>

              <Box sx={{ display: 'flex' }}>
                <Tooltip title={t('IMPORT_USER')}>
                  <Button
                    component="button"
                    role="button"
                    variant="contained"
                    onClick={() => {
                      document.getElementById('importFile').click();
                    }}
                  >
                    <img src={importIcon} alt="import" />
                  </Button>
                </Tooltip>

                <Tooltip title={t('ADD_USER')}>
                  <Button
                    component="button"
                    role="button"
                    sx={{ ml: 1 }}
                    variant="contained"
                    onClick={() => {
                      // dispatch(setTargetUser({}));
                      // dispatch(
                      //   openDialog({
                      //     children: <AddUpdateUser />,
                      //   })
                      // );

                      setSidebarOpen({ ...sidebarOpen, right: true });
                    }}
                  >
                    <img src={add} alt="add" />
                  </Button>
                </Tooltip>

                <Tooltip title={t('EXPORT')}>
                  <Button
                    sx={{ ml: 1 }}
                    variant="contained"
                    aria-label="export"
                    onClick={() => {
                      dispatch(exportUser());
                    }}
                  >
                    <img src={exportExcel} alt="export" />
                  </Button>
                </Tooltip>
              </Box>
            </div>
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
                  rowCount={listUserByPagination?.length}
                />
                <StyledTableBody>
                  {stableSort(listUserByPagination, getComparator(order, orderBy)) &&
                  stableSort(listUserByPagination, getComparator(order, orderBy))?.slice(
                    0,
                    pageSize
                  )?.length ? (
                    stableSort(listUserByPagination, getComparator(order, orderBy))
                      .slice(0, pageSize)
                      .map((row) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                          <TableCell align="left">{row.username}</TableCell>

                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="left">{row.phoneNumber}</TableCell>
                          <TableCell align="left">{row.birthDay}</TableCell>
                          <TableCell align="left">{row.locked === 1 ? 'True' : 'False'}</TableCell>

                          <TableCell align="center" style={{ cursor: 'pointer' }}>
                            <Tooltip title={t('UPDATE_USER')}>
                              <Button
                                component="button"
                                role="button"
                                variant="text"
                                onClick={() => {
                                  dispatch(setTargetUser(row));
                                  dispatch(setIsEditUser(true));
                                  dispatch(
                                    openDialog({
                                      children: <AddUpdateUser />,
                                    })
                                  );
                                }}
                              >
                                <img src={update} alt="update" />
                              </Button>
                            </Tooltip>

                            <Tooltip title={t('DELETE_USER')}>
                              <Button
                                onClick={() => {
                                  dispatch(setTargetUser(row));
                                  dispatch(openDialog({ children: <DeleteUser target={row} /> }));
                                }}
                                role="button"
                                variant="text"
                                color="error"
                                style={{ padding: 0 }}
                              >
                                <img src={deleteIcon} alt="deleteIcon" />
                              </Button>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={headCells.length}>{t('NO_DATA_IN_TABLE')}</TableCell>
                    </TableRow>
                  )}
                </StyledTableBody>
              </Table>
            </TableContainer>
            <StyledTablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalUser}
              rowsPerPage={pageSize}
              page={pageIndex}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={t('ROWS_PER_PAGE')}
            />
          </Paper>

          <input
            id="importFile"
            ref={importFile}
            onChange={handleImportUser}
            style={{ width: '0.001px', height: '0.001px', opacity: '0' }}
            type="file"
            accept=".xlsx, .xls, .csv"
          />

          <div>
            {['left', 'right', 'top', 'bottom'].map((anchor) => (
              <React.Fragment key={anchor}>
                <SwipeableDrawer
                  anchor={anchor}
                  open={sidebarOpen[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  <CardContent className="flex flex-col justify-center w-full py-96 max-w-320">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.2 } }}
                    >
                      <div className="flex items-center justify-center mb-32">
                        {/* <img className="logo-icon w-128" src="assets/images/logo.png" alt="logo" /> */}
                        <svg
                          width="30"
                          height="33"
                          viewBox="0 0 30 33"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.9281 1.11021C13.0067 1.18545 13.0835 1.26293 13.164 1.3348C14.4688 2.48801 15.5065 3.9099 16.1976 5.66568C16.3133 5.96 16.4602 6.03295 16.7121 6.03057C18.2162 6.01852 19.7204 6.01433 21.2245 6.027C22.7589 6.04077 23.8798 6.92555 24.4743 8.55667C25.5846 11.6021 23.6582 14.3806 21.5574 14.4649C19.8203 14.5355 18.0793 14.4882 16.3403 14.5037C15.0834 14.5145 13.8227 14.4792 12.5705 14.5788C10.7766 14.7202 9.24915 15.6469 7.98997 17.152C6.11446 19.3912 5.34639 22.1118 5.77098 25.2228C6.16707 28.1192 7.52333 30.2903 9.63803 31.7948C9.70435 31.843 9.78108 31.8711 9.8834 31.9238C9.89186 31.762 9.90318 31.6429 9.90314 31.5216C9.90414 29.2171 9.89473 26.9138 9.90521 24.6093C9.90873 23.9026 9.87719 23.1711 10.0152 22.4958C10.3537 20.8282 11.7058 19.5556 13.154 19.5222C15.1156 19.4762 17.0782 19.5167 19.0407 19.4887C20.3185 19.4711 21.6105 19.639 22.8701 19.2799C25.8089 18.4412 27.8067 16.2986 28.6597 12.8734C29.8116 8.25715 27.8794 3.60095 24.1648 1.70186C23.3804 1.30117 22.5496 1.12185 21.7028 1.04141C21.4347 1.01571 21.1629 1.02372 20.893 1.02387C18.2484 1.02418 15.6048 1.02674 12.9612 1.02817C12.9499 1.05514 12.9395 1.08211 12.9281 1.11021Z"
                            fill="#60DAFA"
                          />
                          <path
                            d="M11.3355 12.9291C12.1738 12.8827 12.9438 12.8296 13.7139 12.8C14.2424 12.7796 14.7709 12.7929 15.3004 12.7938C15.4557 12.7948 15.5789 12.7723 15.574 12.5307C15.541 11.042 15.7032 9.53634 15.37 8.07133C14.5963 4.66158 12.7841 2.37247 9.94114 1.38152C5.97742 0.00115318 1.88306 2.53203 0.456083 7.13256C0.144019 8.1383 0.00815268 9.18441 0.00774382 10.2507C0.00673612 17.636 0.0123587 25.0213 0.0170339 32.4066C0.0173283 32.9897 0.0192227 32.9897 0.489974 32.9895C1.60576 32.9902 2.72248 32.974 3.83828 32.9983C4.18022 33.0049 4.26919 32.8824 4.26899 32.4812C4.25483 25.0813 4.25299 17.6814 4.2521 10.2826C4.25118 8.46918 5.13698 6.94973 6.5546 6.30758C8.82732 5.27744 11.3071 7.27189 11.3341 10.1572C11.3422 11.0763 11.3351 11.9954 11.3355 12.9291Z"
                            fill="#60DAFA"
                          />
                        </svg>
                      </div>
                    </motion.div>

                    <CreateUserForm />
                  </CardContent>
                </SwipeableDrawer>
              </React.Fragment>
            ))}
          </div>
        </Box>
      )}
    </>
  );
}

export default UserList;
