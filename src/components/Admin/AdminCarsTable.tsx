import {ICar} from "@/api/models/ICar.ts";
import Loader from "@/components/UI/Loader.tsx";
import useStores from "@/hooks/useStores.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import {alpha, InputBase, styled} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {visuallyHidden} from "@mui/utils";
import {ChangeEvent, Dispatch, FC, MouseEvent, SetStateAction, useEffect, useMemo, useState} from "react";
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
    id: keyof ICar;
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
        id: "car_model",
        numeric: true,
        disablePadding: false,
        label: "CarModel",
    },
    {
        id: "year",
        numeric: true,
        disablePadding: false,
        label: "Year",
    },
    {
        id: "name",
        numeric: true,
        disablePadding: false,
        label: "Name",
    },
    {
        id: "consumption",
        numeric: true,
        disablePadding: false,
        label: "Consumption",
    },
    {
        id: "horsepower",
        numeric: true,
        disablePadding: false,
        label: "Horsepower",
    },
    {
        id: "car_class",
        numeric: true,
        disablePadding: false,
        label: "CarClass",
    },
    {
        id: "salon",
        numeric: true,
        disablePadding: false,
        label: "Salon",
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (property: keyof ICar) => void;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

const EnhancedTableHead: FC<EnhancedTableProps> = (props) => {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
        props;
    const createSortHandler =
        (property: keyof ICar) => () => {
            onRequestSort(property);
        };
    
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all desserts",
                        }}
                    />
                </TableCell>
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

interface EnhancedTableToolbarProps {
    setRows: Dispatch<SetStateAction<ICar[]>>;
    selected: number[];
    setSelected: Dispatch<SetStateAction<number[]>>;
}

const Search = styled("div")(({theme}) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

const EnhancedTableToolbar: FC<EnhancedTableToolbarProps> = (props) => {
    const {setRows, selected, setSelected} = props;
    
    const [search, setSearch] = useState("");
    let numSelected = selected.length;
    const {carStore} = useStores();
    const navigate = useNavigate();
    
    const handleDelete = async () => {
        selected.forEach((id) => {
            carStore.destroy(id);
        });
        
        setRows(carStore.cars.filter((car) => !selected.includes(car.id)));
        setSelected([]);
    };
    
    const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        
        await carStore.index(event.target.value);
        setRows(carStore.cars);
    };
    
    
    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: "1 1 100%"}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{flex: "1 1 100%"}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Cars
                </Typography>
            )}
            <Button
                sx={{maxWidth: "fit-content", width: "100%"}}
                variant="outlined"
                onClick={() => navigate("/add-car")}
            >
                Add Cars
            </Button>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search…"
                    inputProps={{"aria-label": "search"}}
                />
            </Search>
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

const AdminCarsTable: FC = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof ICar>("id");
    const [selected, setSelected] = useState<number[]>([]);
    
    const {carStore} = useStores();
    let [rows, setRows] = useState<ICar[]>(carStore.cars);
    const [isLoading, setLoading] = useState<boolean>(false);
    
    
    const handleClick = (id: number) => {
        navigate(`/edit-car/${id}`);
    };
    
    const handleSelect = (event: MouseEvent<HTMLButtonElement>, id: number) => {
        event.stopPropagation();
        
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];
        
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        
        setSelected(newSelected);
    };
    
    const isSelected = (id: number) => selected.indexOf(id) !== -1;
    
    const sortedRows = useMemo(
        () => stableSort(rows, getComparator(order, orderBy)),
        [order, orderBy, rows],
    );
    
    const handleRequestSort = (property: keyof ICar) => {
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
    
    useEffect(() => {
        (async () => {
            setLoading(true);
            await carStore.index();
            setRows(carStore.cars);
            setLoading(false);
        })();
    }, []);
    
    if (isLoading) {
        return <Loader/>;
    }
    
    
    return (
        <Box>
            <Paper sx={{width: "100%", mb: 2}}>
                <EnhancedTableToolbar
                    setRows={setRows}
                    selected={selected}
                    setSelected={setSelected}
                />
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
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={(event) => {
                                                    handleSelect(event, row.id);
                                                }}
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    "aria-labelledby": labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="right">{row.car_model}</TableCell>
                                        <TableCell align="right">{row.year}</TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.consumption}</TableCell>
                                        <TableCell align="right">{row.horsepower}</TableCell>
                                        <TableCell align="right">{row.car_class}</TableCell>
                                        <TableCell align="right">{row.salon}</TableCell>
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

export default AdminCarsTable;