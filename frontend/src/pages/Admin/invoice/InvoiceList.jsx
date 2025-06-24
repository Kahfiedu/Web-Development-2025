import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    InputBase,
    Badge,
    IconButton,
    Button,
    Box,
    Grid,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    TablePagination,
    Chip,
    Breadcrumbs,
    Link,
    Stack,
    Menu,
    MenuItem,
} from '@mui/material';

// Material-UI Icons
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import SpreadsheetIcon from '@mui/icons-material/Description'; // Closest common icon for spreadsheet
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useAlert from "../../../hooks/useAlert";
import { useLoading } from '../../../hooks/useLoading';
import invoiceService from '../../../services/invoiceService';
import formatDate from '../../../utils/formatDate';


const InvoiceList = () => {
    const [invoiceData, setInvoiceData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalRows, setTotalRows] = useState(0);
    const [countData, setCountData] = useState(null)
    const [status, setStatus] = useState("all");
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUserId, setSelectedUserId] = useState("");
    const [selectedClassId, setSelectedClassId] = useState("");

    const { showAlert } = useAlert();
    const { showLoading, hideLoading } = useLoading();

    const fetchInvoice = async () => {
        showLoading()
        try {
            const res = await invoiceService.getPayments({
                page: page + 1,
                limit: rowsPerPage,
                status,
                userId: selectedUserId,
                classId: selectedClassId,
            });

            if (res.success) {
                setInvoiceData(res.payments);
                setTotalRows(res.meta?.total || 0);
                setCountData(res.countData)
            }

        } catch (error) {
            showAlert(error.message, "error")
        } finally {
            hideLoading()
        }
    }

    useEffect(() => {
        fetchInvoice()
    }, [page, rowsPerPage, totalRows, status, selectedClassId, selectedUserId]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'complated':
                return { backgroundColor: 'success.light', color: 'white', borderColor: 'success.main' };
            case 'pending':
                return { backgroundColor: 'warning.light', color: 'white', borderColor: 'warning.main' };
            case 'failed':
                return { backgroundColor: 'error.light', color: 'white', borderColor: 'error.main' };
            default:
                return { backgroundColor: 'grey.100', color: 'grey.800', borderColor: 'grey.200' };
        }
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Add status change handler
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        setPage(0);
    };

    return (
        <Box sx={{ minHeight: '100vh' }}>


            {/* Main Content Area */}
            <Box component="main" sx={{ px: 3, py: 3 }}>
                {/* Breadcrumbs */}

                <Grid container spacing={3}>
                    {/* Main Table Content */}
                    <Grid size={{ xs: 12, md: 9 }}> {/* lg:col-span-3 */}
                        <Card sx={{ borderRadius: '8px', boxShadow: 1 }}>
                            {/* Header with Export Buttons */}
                            <CardContent sx={{ pb: 0, borderBottom: '1px solid' }}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" mb={2}>
                                    <Box>
                                        <Typography variant="h6" component="h1" fontWeight="bold" color="grey.900" mb={0.5}>
                                            Data Pembayaran
                                        </Typography>
                                        <Typography variant="body2" color="grey.600">
                                            Export Data pembayaran ke CSV Excel
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" spacing={1.5} mt={{ xs: 2, sm: 0 }}>
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: 'green.600', '&:hover': { backgroundColor: 'green.700' } }}
                                            startIcon={<DownloadIcon />}
                                        >
                                            Export
                                        </Button>
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: 'green.600', '&:hover': { backgroundColor: 'green.700' } }}
                                            startIcon={<SpreadsheetIcon />}
                                        >
                                            Excel
                                        </Button>
                                    </Stack>
                                </Box>
                            </CardContent>

                            {/* Search Input for Table */}
                            <CardContent sx={{ pb: 2, borderBottom: '1px solid', borderColor: 'grey.200' }}>
                                <InputBase
                                    placeholder="Cari nama pengguna"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    startAdornment={<SearchIcon sx={{ color: 'grey.400', mr: 1 }} />}
                                    sx={{
                                        width: { xs: '100%', sm: 'auto' },
                                        p: 1,
                                        border: '1px solid',
                                        borderColor: 'grey.300',
                                        borderRadius: '8px',
                                        '&.Mui-focused': {
                                            boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.2)',
                                            borderColor: 'green.500',
                                        },
                                    }}
                                />
                            </CardContent>

                            {/* Table */}
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{ backgroundColor: 'grey.50' }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'medium', color: 'grey.500', textTransform: 'uppercase', fontSize: '0.75rem' }}>#</TableCell>
                                            <TableCell sx={{ fontWeight: 'medium', color: 'grey.500', textTransform: 'uppercase', fontSize: '0.75rem' }}>Invoice</TableCell>
                                            <TableCell sx={{ fontWeight: 'medium', color: 'grey.500', textTransform: 'uppercase', fontSize: '0.75rem' }}>Issued</TableCell>
                                            <TableCell sx={{ fontWeight: 'medium', color: 'grey.500', textTransform: 'uppercase', fontSize: '0.75rem' }}>Kelas</TableCell>
                                            <TableCell sx={{ fontWeight: 'medium', color: 'grey.500', textTransform: 'uppercase', fontSize: '0.75rem' }}>Status</TableCell>
                                            <TableCell sx={{ fontWeight: 'medium', color: 'grey.500', textTransform: 'uppercase', fontSize: '0.75rem' }}>Tanggal</TableCell>
                                            <TableCell sx={{ fontWeight: 'medium', color: 'grey.500', textTransform: 'uppercase', fontSize: '0.75rem' }}>Total</TableCell>
                                            <TableCell sx={{ fontWeight: 'medium', color: 'grey.500', textTransform: 'uppercase', fontSize: '0.75rem' }}>Aksi</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {invoiceData.map((row, index) => (
                                            <TableRow key={row.id} hover>
                                                <TableCell sx={{ fontSize: '0.875rem', color: 'grey.900' }}>
                                                    {page * rowsPerPage + index + 1}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: '0.875rem', color: 'grey.900' }}>
                                                    {row.invoice}
                                                </TableCell>
                                                <TableCell>
                                                    <Box>
                                                        <Typography variant="subtitle2" fontWeight="medium" color="grey.900">
                                                            {row.fromUser.name}
                                                        </Typography>
                                                        <Typography variant="subtitle2" fontWeight={300} color="grey">
                                                            Metode : {row.method_name}
                                                        </Typography>
                                                    </Box>

                                                </TableCell>
                                                <TableCell sx={{ fontSize: '0.875rem', color: 'grey.900' }}>
                                                    {row.forClass.name}
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={row.status}
                                                        size="small"
                                                        sx={{
                                                            fontWeight: 'semibold',
                                                            ...getStatusColor(row.status),
                                                            border: '1px solid',
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ fontSize: '0.875rem', color: 'grey.900' }}>
                                                    {formatDate(row.payment_date)}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: '0.875rem', color: 'grey.900' }}>
                                                    {new Intl.NumberFormat('id-ID', {
                                                        style: 'currency',
                                                        currency: 'IDR',
                                                        minimumFractionDigits: 0
                                                    }).format(row.amount)}
                                                </TableCell>
                                                <TableCell>
                                                    <Stack direction="row" spacing={1}>
                                                        <IconButton sx={{ color: 'orange.600', '&:hover': { color: 'orange.800' } }}>
                                                            <EditIcon sx={{ fontSize: 16 }} />
                                                        </IconButton>
                                                        <IconButton sx={{ color: 'error.main', '&:hover': { color: 'error.dark' } }}>
                                                            <DeleteIcon sx={{ fontSize: 16 }} />
                                                        </IconButton>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* Pagination */}
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={totalRows}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Card>
                    </Grid>

                    {/* Sidebar */}
                    <Grid size={{ xs: 12, md: 3 }}> {/* lg:col-span-1 */}
                        <Stack spacing={2}>

                            {/* Statistics Cards */}
                            <Card sx={{ backgroundColor: "#008B47", borderRadius: '8px', p: 3, color: "white", textAlign: 'center', boxShadow: 1 }}>
                                <Typography variant="h3" fontWeight="bold" mb={1}>
                                    {countData ? countData.completed : 0}
                                </Typography>
                                <Typography variant="h6">
                                    Disetujui
                                </Typography>
                            </Card>

                            <Card sx={{ backgroundColor: '#FF9500', color: "white", borderRadius: '8px', p: 3, textAlign: 'center', boxShadow: 1 }}>
                                <Typography variant="h3" fontWeight="bold" mb={1}>
                                    {countData ? countData.pending : 0}
                                </Typography>
                                <Typography variant="h6">
                                    Diproses
                                </Typography>
                            </Card>

                            <Card sx={{ backgroundColor: 'error.main', color: "white", borderRadius: '8px', p: 3, textAlign: 'center', boxShadow: 1 }}>
                                <Typography variant="h3" fontWeight="bold" mb={1}>
                                    {countData ? countData.failed : 0}
                                </Typography>
                                <Typography variant="h6">
                                    Ditolak
                                </Typography>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

        </Box>
    );
};

export default InvoiceList;