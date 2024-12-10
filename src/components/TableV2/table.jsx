import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
// import { TiArrowUnsorted } from 'react-icons/ti';


// function descendingComparator() {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }



function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    Icon1,
    Icon2,
    Icon3,
    Icon4,
    sortIcon,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    cols,
    data,
    sx
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow sx={sx}>
        {/* <TableCell sx={sx}>
          <Checkbox
            icon={Icon1}
            checkedIcon={Icon2}
            color="primary"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell> */}
        {cols?.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={sx}
            style={headCell.style}
          >
            {headCell.sortLabel ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                IconComponent={() => sortIcon}
              >
                {headCell.columnLabel}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.columnLabel
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TableV2(tableProps) {
  const {
    cols = [],
    data = [],
    parentData = [],
    page,
    setPage,
    onRowClick = () => {},
    rowsPerPage,
    headStyle,
    bodyStyle,
    Icon1,
    Icon2,
    Icon3,
    Icon4,
    rowStyle,
    tableContainerStyles,
    selected,
    setSelected,
    sortIcon,
    userSelectedRow
  } = tableProps;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState();
  const [hoveredRow, setHoveredRow] = React.useState();
  const [isHovered, setIsHovered] = React.useState(false);
  // const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     // const newSelected = data;
  //     setSelected(data);
  //     return;
  //   }
  //   setSelected([]);
  // };
  // const handleClick = (event: React.MouseEvent<unknown>, row: any) => {
  //   const target = event.target as HTMLInputElement;
  //   const isCheckbox = target.type === 'checkbox' && target.tagName === 'INPUT';
  //   if (isCheckbox) {
  //     const selectedIndex = selected?.indexOf(row);
  //     let newSelected: readonly string[] = [];
  //     if (selectedIndex === -1) {
  //       newSelected = newSelected.concat(selected, row);
  //     } else if (selectedIndex === 0) {
  //       newSelected = newSelected.concat(selected?.slice(1));
  //     } else if (selectedIndex === selected?.length - 1) {
  //       newSelected = newSelected.concat(selected?.slice(0, -1));
  //     } else if (selectedIndex > 0) {
  //       newSelected = newSelected.concat(selected?.slice(0, selectedIndex), selected?.slice(selectedIndex + 1));
  //     }
  //     setSelected(newSelected);
  //   } else if (!isCheckbox) {
  //     onRowClick(row);
  //   }
  // };
  // const isSelected = (name: any) =>
  //   selected.length > 0
  //     ? selected.filter((item: any) => JSON.stringify(item) === JSON.stringify(name)).length > 0
  //     : JSON.stringify(name) === JSON.stringify(userSelectedRow);

  // const visibleRows = React.useMemo(
  //   () => stableSort(data, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
  //   [order, orderBy, page, rowsPerPage,data]
  // );

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Paper sx={{ maxWidth: '100%', mb: 2, boxShadow: 'none' }}>
        <TableContainer sx={{ ...tableContainerStyles }}>
          <Table sx={{ minWidth: 750 ,borderCollapse:'collapse'}} stickyHeader aria-labelledby="tableTitle">
            <EnhancedTableHead
              cols={cols}
              data={data}
              numSelected={selected?.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              // onRequestSort={handleRequestSort}
              rowCount={data.length}
              sx={headStyle}
              Icon1={Icon1}
              Icon2={Icon2}
              sortIcon={sortIcon}
            />
            <TableBody>
              {data?.map((row, index) => {
                // const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    // onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    // aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    // selected={isItemSelected}
                    onMouseEnter={() => setHoveredRow(row)}
                    onMouseLeave={() => setHoveredRow('')}
                    sx={bodyStyle}
                  >
                    {/* <TableCell>
                      {hoveredRow === row ? (
                        <Checkbox
                          icon={Icon3}
                          checkedIcon={Icon2}
                          color="primary"
                          checked={isItemSelected && selected.length > 0}
                          inputProps={{
                            'aria-labelledby': labelId
                          }}
                          sx={{ cursor: 'pointer' }}
                        />
                      ) : (
                        <Checkbox
                          icon={Icon1}
                          checkedIcon={Icon2}
                          color="primary"
                          checked={isItemSelected && selected.length > 0}
                          inputProps={{
                            'aria-labelledby': labelId
                          }}
                          sx={{
                            cursor: 'pointer'
                          }}
                        />
                      )}
                    </TableCell> */}
                    {cols.map((col, key) => {
                      return (
                        <TableCell key={key} sx={rowStyle}>
                          {col.render(row, index, parentData)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
