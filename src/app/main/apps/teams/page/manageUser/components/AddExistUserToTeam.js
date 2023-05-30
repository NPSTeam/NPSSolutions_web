/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Icon,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { checkboxClasses } from '@mui/material/Checkbox';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getComparator, stableSort } from 'src/utils';
import {
  assignUser,
  fetchUsersWithCheckedInSystem,
  setListUserWithCheckedInSystem,
  setListUsersSelected,
  setSelectedItem,
} from '../../../store/manageUserInTeamSlice';

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& .MuiTableRow-root': {
    backgroundColor: theme.palette.primary.main,
    '& .MuiTableCell-root': {
      color: theme.palette.primary.contrastText,
      '& .MuiTableSortLabel-root': {
        color: 'inherit',
        '& .MuiTableSortLabel-icon': {
          color: 'inherit',
        },
      },
    },
  },
}));
const StyledTableBody = styled(TableBody)(({ theme }) => ({
  '& .MuiTableRow-root': {
    '& .MuiTableCell-root': {
      borderColor: theme.palette.secondary.main,
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
    '&.Mui-selected': {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      color: theme.palette.primary.contrastText,
    },
  },
}));

const headCells = [
  {
    id: 'username',
    numeric: false,
    disablePadding: false,
    sortable: true,
    label: ['USERNAME'],
    align: 'center',
  },
];

function EnhancedTableHead(props) {
  const { t } = useTranslation('teams');
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    onRequestSort,
    listUserWithCheckedInSystem,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <StyledTableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ borderTopLeftRadius: 8 }}>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < listUserWithCheckedInSystem.length}
            checked={
              listUserWithCheckedInSystem.length > 0 &&
              numSelected === listUserWithCheckedInSystem.length
            }
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
            sx={{
              [`&, &.${checkboxClasses.checked}`]: {
                color: useTheme().palette.primary.contrastText,
              },
            }}
          />
        </TableCell>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              borderTopRightRadius: index === headCells.length - 1 && 8,
              fontWeight: 'bold',
            }}
          >
            <TableSortLabel
              // style={{ color: theme.palette.primary.contrastText }}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={headCell.sortable ? createSortHandler(headCell.id) : undefined}
              hideSortIcon
            >
              {headCell.label.map((item, headCellIndex) => (
                <Fragment key={headCellIndex}>
                  {t(item)}
                  <br />
                </Fragment>
              ))}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </StyledTableHead>
  );
}

export default function AddExistUserToTeam() {
  const { t } = useTranslation('teams');
  const dispatch = useDispatch();
  const getState = useSelector((state) => state);

  const listUserWithCheckedInSystem = useSelector(
    (state) => state.teams.userInTeam.listUserWithCheckedInSystem
  );
  const originalListUserWithCheckedInSystem = useSelector(
    (state) => state.teams.userInTeam.originalListUserWithCheckedInSystem
  );

  useEffect(() => {
    dispatch(fetchUsersWithCheckedInSystem({ dispatch, getState }));
  }, [dispatch]);

  useEffect(() => {
    const checkedIds = listUserWithCheckedInSystem
      .filter((obj) => obj.checked === true)
      .map((obj) => obj.userId);
    dispatch(setSelectedItem(checkedIds));

    const listUsersSelected = listUserWithCheckedInSystem
      .filter((obj) => obj.checked === true)
      .map((obj) => {
        return obj.userId;
      });
    dispatch(setListUsersSelected(listUsersSelected));
  }, [listUserWithCheckedInSystem]);

  const selectedItem = useSelector((state) => state.teams.userInTeam.selectedItem);
  const isLoadingTableListUserWithChecked = useSelector(
    (state) => state.teams.userInTeam.isLoadingTableListUserWithChecked
  );

  const listUsersSelected = useSelector((state) => state.teams.userInTeam.listUsersSelected);

  const checkIsSelected = (id) => selectedItem?.indexOf(id) !== -1;

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [rowsSelectedInCurrentPage, setRowsSelectedInCurrentPage] = useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    let newNumRows = 0;
    listUserWithCheckedInSystem.forEach((row) => {
      const selectedIndex = selectedItem?.indexOf(row.userId);
      if (selectedIndex !== -1) newNumRows += 1;
    });
    setRowsSelectedInCurrentPage(newNumRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listUserWithCheckedInSystem, selectedItem]);

  function arrayEquals(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  }

  const handleCheckboxClick = (event, row) => {
    event.currentTarget.disabled = true;

    const { userId } = row;
    const selectedIndex = selectedItem.indexOf(userId);
    const newSelected = [...selectedItem];
    const newListUsersSelected = [...listUsersSelected];

    if (selectedIndex === -1) {
      if (selectedItem.length === 0) {
        dispatch(setListUsersSelected([]));
      }
      newSelected.push(userId);

      newListUsersSelected.splice(selectedIndex + 1, 0, userId);
    } else {
      newSelected.splice(selectedIndex, 1);
      newListUsersSelected.splice(selectedIndex, 1);
    }

    if (!arrayEquals(newSelected, selectedItem)) {
      dispatch(setSelectedItem(newSelected));
      dispatch(setListUsersSelected(newListUsersSelected));
    }
  };

  const handleSelectAllClick = (event) => {
    if (selectedItem?.length === 0) {
      dispatch(dispatch(setListUsersSelected([])));
    }
    if (event?.target?.checked) {
      const newSelected = [];
      const newArrUser = [];

      listUserWithCheckedInSystem.forEach((row) => {
        if (selectedItem.indexOf(row.userId) === -1) {
          newSelected.push(row.userId);
          newArrUser.push(row.userId);
          // dispatch(addSelectedItem({ item: row }));
        }
      });
      dispatch(setSelectedItem([...selectedItem].concat(newSelected)));
      dispatch(setListUsersSelected([...listUsersSelected].concat(newArrUser)));
    } else {
      const newSelected = [...selectedItem];
      const newArrUser = [...listUsersSelected];
      listUserWithCheckedInSystem.forEach((row) => {
        // dispatch(subSelectedItem({ item: row }));
        const selectedIndex = newSelected.indexOf(row.userId);
        newSelected.splice(selectedIndex, 1);
        newArrUser.splice(selectedIndex, 1);
      });
      dispatch(setSelectedItem(newSelected));
      dispatch(setListUsersSelected(newArrUser));
    }
  };

  const handleAddUserToTeam = () => {
    dispatch(assignUser({ data: listUsersSelected, t }));
  };

  const valueDebounce = 500;

  function searchUsers(data, searchQuery) {
    return data.filter((user) => {
      const searchableFields = ['username', 'phoneNumber', 'birthDay', 'email'];
      return searchableFields.some((field) => {
        if (typeof user[field] === 'string') {
          return user[field].toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });
    });
  }

  const handleSearch = debounce((e) => {
    const { value } = e.target;
    console.log('value', value);

    if (value !== '') {
      const data = searchUsers(originalListUserWithCheckedInSystem, value);
      dispatch(setListUserWithCheckedInSystem(data));
    } else {
      dispatch(setListUserWithCheckedInSystem(originalListUserWithCheckedInSystem));
    }
  }, valueDebounce);

  return (
    <Box sx={{ width: '30vw' }}>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '5px',
          borderRadius: '0px',
          flexDirection: 'row-reverse',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ padding: '8px 12px', borderRadius: '4px' }}
          onClick={handleAddUserToTeam}
        >
          <Typography noWrap fontSize={12} fontWeight={700} lineHeight={1.25}>
            {t('SAVE')}
          </Typography>
        </Button>
      </Paper>

      {isLoadingTableListUserWithChecked ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ width: '348px', height: '280px' }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div className="flex flex-1 items-center justify-between py-8 sm:p-24">
            <div className="flex flex-1 items-center justify-center px-8 sm:px-12">
              <Paper
                component={motion.div}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                className="flex p-4 items-center w-full max-w-512 h-48 px-16 py-4 shadow"
              >
                <Icon color="action">search</Icon>

                <Input
                  placeholder={t('SEARCH_USER')}
                  className="flex flex-1 px-16"
                  disableUnderline
                  fullWidth
                  inputProps={{
                    'aria-label': 'Search',
                  }}
                  onChange={handleSearch}
                />
              </Paper>
            </div>
          </div>

          <Paper sx={{ width: '100%', borderRadius: '8px' }}>
            <TableContainer sx={{ maxHeight: '300px' }}>
              <Table sx={{}} aria-labelledby="tableTitle" size="small">
                <EnhancedTableHead
                  numSelected={rowsSelectedInCurrentPage}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  listUserWithCheckedInSystem={listUserWithCheckedInSystem}
                />
                <StyledTableBody>
                  {listUserWithCheckedInSystem.length ? (
                    stableSort(listUserWithCheckedInSystem, getComparator(order, orderBy))
                      // .slice(0, rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = checkIsSelected(row.userId);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.userId}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                onClick={(event) => handleCheckboxClick(event, row)}
                                onDoubleClick={(event) => {}}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </TableCell>

                            <TableCell align="center">{row.username}</TableCell>
                          </TableRow>
                        );
                      })
                  ) : (
                    <TableRow hover role="checkbox">
                      <TableCell colSpan="100%" sx={{ textAlign: 'center' }}>
                        {t('NO_DATA')}
                      </TableCell>
                    </TableRow>
                  )}
                </StyledTableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
    </Box>
  );
}
