import {IRent} from "@/api/models/IRent.ts";
import Loader from "@/components/UI/Loader.tsx";
import useStores from "@/hooks/useStores.tsx";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {visuallyHidden} from "@mui/utils";
import {ChangeEvent, FC, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    
    return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof IRent;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: "id",
        numeric: false,
        disablePadding: true,
        label: "ID",
    },
    {
        id: "car",
        numeric: true,
        disablePadding: false,
        label: "Car",
    },
    {
        id: "client",
        numeric: true,
        disablePadding: false,
        label: "Client",
    },
    {
        id: "start",
        numeric: true,
        disablePadding: false,
        label: "Start Date",
    },
    {
        id: "end",
        numeric: true,
        disablePadding: false,
        label: "End Date",
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (property: keyof IRent) => void;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

const EnhancedTableHead: FC<EnhancedTableProps> = (props) => {
    const {order, orderBy, onRequestSort} =
        props;
    const createSortHandler =
        (property: keyof IRent) => () => {
            onRequestSort(property);
        };
    
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox"/>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

const EnhancedTableToolbar: FC = () => {
    return (
        <Toolbar
            sx={{
                marginTop: 4,
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
            }}
        >
            <Typography
                sx={{flex: "1 1 100%"}}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Rentals
            </Typography>
        </Toolbar>
    );
};

const AdminRentalsTable: FC = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof IRent>("id");
    const [selected, setSelected] = useState<number[]>([]);
    
    const {rentStore} = useStores();
    let [rows, setRows] = useState<IRent[]>(rentStore.rentals);
    const [isLoading, setLoading] = useState<boolean>(false);
    
    const handleRequestSort = (property: keyof IRent) => {
        const isAsc = orderBy === property && order === "asc";
        
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    
    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        
        setSelected([]);
    };
    
    const isSelected = (id: number) => selected.indexOf(id) !== -1;
    
    const sortedRows = useMemo(
        () => stableSort(rows, getComparator(order, orderBy)),
        [order, orderBy, rows],
    );
    
    useEffect(() => {
        (async () => {
            setLoading(true);
            await rentStore.index();
            setRows(rentStore.rentals);
            setLoading(false);
        })();
    }, []);
    
    if (isLoading) {
        return <Loader/>;
    }
    
    const handleClick = (id: number) => {
        navigate(`/edit-rent/${id}`);
    };
    
    return (
        <Box>
            <Paper sx={{width: "100%", mb: 2}}>
                <EnhancedTableToolbar/>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {sortedRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                
                                return (
                                    <TableRow
                                        onClick={() => handleClick(row.id)}
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{cursor: "pointer"}}
                                    >
                                        <TableCell padding="checkbox"/>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="right">{row.car}</TableCell>
                                        <TableCell align="right">{row.client}</TableCell>
                                        <TableCell align="right">{row.start}</TableCell>
                                        <TableCell align="right">{row.end}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default AdminRentalsTable;