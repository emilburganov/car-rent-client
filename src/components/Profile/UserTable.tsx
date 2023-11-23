import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import useStores from "@/hooks/useStores.tsx";

function createData(
    id: number,
    login: string,
    surname: string,
    name: string,
    role: string,
) {
    return {id, login, surname, name, role};
}

const UserTable = (): JSX.Element => {
    const {authStore} = useStores();
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await authStore.me();
            setLoading(false);
        })();
    }, [])

    if (isLoading) {
        return;
    }

    const rows = [
        createData(
            authStore.user.id,
            authStore.user.login,
            authStore.user.surname,
            authStore.user.name,
            authStore.user.role,
        ),
    ];

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Login</TableCell>
                        <TableCell align="right">Surname</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.login}</TableCell>
                            <TableCell align="right">{row.surname}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UserTable;