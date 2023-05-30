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
  Chip,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { openDialog } from 'app/store/fuse/dialogSlice';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import exportExcel from 'src/assets/icon/exportExcel.svg';
import add from 'src/assets/icon/add.svg';
import update from 'src/assets/icon/update.svg';
import deleteIcon from 'src/assets/icon/deleteIcon.svg';

import {
  setItemAppsByPagination,
  setTargetItemApp,
  setIsEditItemApp,
  exportItemApp,
} from '../store/manageItemsAppSlice';
import AddUpdateItem from './dialog/AddUpdateItemApp';
import DeleteItem from './dialog/DeleteItemApp';

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

function ListItemsApp() {
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

  const { t } = useTranslation('manageItemsApp');
  const theme = useTheme();
  const dispatch = useDispatch();

  const totalItemApp = useSelector((state) => state.manageItemsApp.manageItemsApp.totalItemApp);
  const pageSize = useSelector((state) => state.manageItemsApp.manageItemsApp.pageSize);
  const pageIndex = useSelector((state) => state.manageItemsApp.manageItemsApp.pageIndex);
  const isLoadingListItemApp = useSelector(
    (state) => state.manageItemsApp.manageItemsApp.isLoadingListItemApp
  );

  const listItemAppByPagination = useSelector(
    (state) => state.manageItemsApp.manageItemsApp.listItemAppByPagination
  );

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);

  const headCells = [
    {
      id: 'Code',
      numeric: false,
      disablePadding: false,
      label: t('CODE'),
      align: 'left',
      sortable: true,
    },
    {
      id: 'Name',
      numeric: false,
      disablePadding: false,
      label: t('NAME'),
      align: 'left',
      sortable: true,
    },
    {
      id: 'Actived',
      numeric: false,
      disablePadding: false,
      label: t('ACTIVED'),
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
    dispatch(setItemAppsByPagination());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    dispatch(setItemAppsByPagination({ pageIndex: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setItemAppsByPagination({ pageSize: event.target.value }));
  };

  return (
    <>
      {isLoadingListItemApp ? (
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
                {t('ITEMS_APPLICATION_MANAGEMENT')}
              </Typography>

              <Box sx={{ display: 'flex' }}>
                <Tooltip title={t('ADD_ITEM')}>
                  <Button
                    component="button"
                    role="button"
                    variant="contained"
                    onClick={() => {
                      dispatch(setTargetItemApp({}));
                      dispatch(
                        openDialog({
                          children: <AddUpdateItem />,
                        })
                      );
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
                      dispatch(exportItemApp());
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
                  rowCount={listItemAppByPagination?.length}
                />
                <StyledTableBody>
                  {stableSort(listItemAppByPagination, getComparator(order, orderBy)) &&
                  stableSort(listItemAppByPagination, getComparator(order, orderBy))?.slice(
                    0,
                    pageSize
                  )?.length ? (
                    stableSort(listItemAppByPagination, getComparator(order, orderBy))
                      .slice(0, pageSize)
                      .map((row) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                          <TableCell align="left">{row.code}</TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">
                            {row.actived === true ? (
                              <Chip label={t('ACTIVE')} color="success" />
                            ) : (
                              <Chip label={t('INACTIVE')} color="error" />
                            )}
                          </TableCell>
                          <TableCell align="center" style={{ cursor: 'pointer' }}>
                            <Tooltip title={t('UPDATE_ITEM_APP')}>
                              <Button
                                component="button"
                                role="button"
                                variant="text"
                                onClick={() => {
                                  dispatch(setTargetItemApp(row));
                                  dispatch(setIsEditItemApp(true));
                                  dispatch(
                                    openDialog({
                                      children: <AddUpdateItem />,
                                    })
                                  );
                                }}
                              >
                                <img src={update} alt="update" />
                              </Button>
                            </Tooltip>

                            <Tooltip title={t('DELETE_ITEM')}>
                              <Button
                                onClick={() => {
                                  dispatch(setTargetItemApp(row));
                                  dispatch(openDialog({ children: <DeleteItem target={row} /> }));
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
              count={totalItemApp}
              rowsPerPage={pageSize}
              page={pageIndex}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={t('ROWS_PER_PAGE')}
            />
          </Paper>
        </Box>
      )}
    </>
  );
}

export default ListItemsApp;
