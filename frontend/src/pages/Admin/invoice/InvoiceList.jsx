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
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const InvoiceList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorElUser, setAnchorElUser] = useState(null); // For user menu

    // Mock data based on the screenshot
    const paymentData = [
        {
            id: 1,
            invoice: '#P060525A1',
            issued: 'Jhone Doe',
            paymentMethod: 'Payment Method: Transfer',
            class: 'Mengaji - Kelas A',
            status: 'Disetujui',
            date: '06 Feb 2025',
            total: 'Rp. 150.000'
        },
        {
            id: 2,
            invoice: '#P060525A1',
            issued: 'Jhone Doe',
            paymentMethod: 'Payment Method: Transfer',
            class: 'Mengaji - Kelas A',
            status: 'Disetujui',
            date: '06 Feb 2025',
            total: 'Rp. 150.000'
        },
        {
            id: 3,
            invoice: '#P060525A1',
            issued: 'Jhone Doe',
            paymentMethod: 'Payment Method: Transfer',
            class: 'Mengaji - Kelas A',
            status: 'Diproses',
            date: '06 Feb 2025',
            total: 'Rp. 150.000'
        },
        {
            id: 4,
            invoice: '#P060525A1',
            issued: 'Jhone Doe',
            paymentMethod: 'Payment Method: Transfer',
            class: 'Mengaji - Kelas A',
            status: 'Disetujui',
            date: '06 Feb 2025',
            total: 'Rp. 150.000'
        },
        {
            id: 5,
            invoice: '#P060525A1',
            issued: 'Jhone Doe',
            paymentMethod: 'Payment Method: Transfer',
            class: 'Mengaji - Kelas A',
            status: 'Disetujui',
            date: '06 Feb 2025',
            total: 'Rp. 150.000'
        },
        {
            id: 6,
            invoice: '#P060525A1',
            issued: 'Jhone Doe',
            paymentMethod: 'Payment Method: Transfer',
            class: 'Mengaji - Kelas A',
            status: 'Disetujui',
            date: '06 Feb 2025',
            total: 'Rp. 150.000'
        },
        {
            id: 7,
            invoice: '#P060525A1',
            issued: 'Jhone Doe',
            paymentMethod: 'Payment Method: Transfer',
            class: 'Mengaji - Kelas A',
            status: 'Disetujui',
            date: '06 Feb 2025',
            total: 'Rp. 150.000'
        },
        {
            id: 8,
            invoice: '#P060525A1',
            issued: 'Jhone Doe',
            paymentMethod: 'Payment Method: Transfer',
            class: 'Mengaji - Kelas A',
            status: 'Ditolak',
            date: '06 Feb 2025',
            total: 'Rp. 150.000'
        },
        {
            id: 9,
            invoice: '#P060525A1',
            issued: 'Jhone Doe',
            paymentMethod: 'Payment Method: Transfer',
            class: 'Mengaji - Kelas A',
            status: 'Disetujui',
            date: '06 Feb 2025',
            total: 'Rp. 150.000'
        },
        {
            id: 10,
            invoice: '#P060525A1',
            issued: 'Jhone Doe',
            paymentMethod: 'Payment Method: Transfer',
            class: 'Mengaji - Kelas A',
            status: 'Disetujui',
            date: '06 Feb 2025',
            total: 'Rp. 150.000'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Disetujui':
                return { backgroundColor: 'success.light', color: 'success.dark', borderColor: 'success.main' };
            case 'Diproses':
                return { backgroundColor: 'warning.light', color: 'warning.dark', borderColor: 'warning.main' };
            case 'Ditolak':
                return { backgroundColor: 'error.light', color: 'error.dark', borderColor: 'error.main' };
            default:
                return { backgroundColor: 'grey.100', color: 'grey.800', borderColor: 'grey.200' };
        }
    };

    const filteredData = paymentData.filter(item =>
        item.issued.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.invoice.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate statistics
    const approvedCount = paymentData.filter(item => item.status === 'Disetujui').length;
    const processedCount = paymentData.filter(item => item.status === 'Diproses').length;
    const rejectedCount = paymentData.filter(item => item.status === 'Ditolak').length;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = filteredData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

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
                            <CardContent sx={{ pb: 0, borderBottom: '1px solid', borderColor: 'grey.200' }}>
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
                                        {paginatedData.map((row, index) => (
                                            <TableRow key={row.id} hover>
                                                <TableCell sx={{ fontSize: '0.875rem', color: 'grey.900' }}>
                                                    {page * rowsPerPage + index + 1}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: '0.875rem', color: 'grey.900' }}>
                                                    {row.invoice}
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight="medium" color="grey.900">
                                                        {row.issued}
                                                    </Typography>
                                                    <Typography variant="body2" color="grey.500">
                                                        {row.paymentMethod}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell sx={{ fontSize: '0.875rem', color: 'grey.900' }}>
                                                    {row.class}
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
                                                    {row.date}
                                                </TableCell>
                                                <TableCell sx={{ fontSize: '0.875rem', color: 'grey.900' }}>
                                                    {row.total}
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
                                count={filteredData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelRowsPerPage="Rows per page:"
                                labelDisplayedRows={({ from, to, count }) =>
                                    `Showing ${from}-${to} of ${count} results`
                                }
                            />
                        </Card>
                    </Grid>

                    {/* Sidebar */}
                    <Grid size={{ xs: 12, md: 3 }}> {/* lg:col-span-1 */}
                        <Stack spacing={2}>

                            {/* Statistics Cards */}
                            <Card sx={{ backgroundColor: 'green.600', borderRadius: '8px', p: 3, textAlign: 'center', boxShadow: 1 }}>
                                <Typography variant="h3" fontWeight="bold" mb={1}>
                                    {approvedCount}
                                </Typography>
                                <Typography variant="h6">
                                    Disetujui
                                </Typography>
                            </Card>

                            <Card sx={{ backgroundColor: 'orange.500', borderRadius: '8px', p: 3, textAlign: 'center', boxShadow: 1 }}>
                                <Typography variant="h3" fontWeight="bold" mb={1}>
                                    {processedCount}
                                </Typography>
                                <Typography variant="h6">
                                    Diproses
                                </Typography>
                            </Card>

                            <Card sx={{ backgroundColor: 'error.main', borderRadius: '8px', p: 3, textAlign: 'center', boxShadow: 1 }}>
                                <Typography variant="h3" fontWeight="bold" mb={1}>
                                    {rejectedCount}
                                </Typography>
                                <Typography variant="h6">
                                    Ditolak
                                </Typography>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    backgroundColor: 'green.600',

                    textAlign: 'center',
                    py: 2,
                    mt: 4,
                }}
            >
                <Typography variant="body2">
                    Copyright &copy; 2025 Kahf Education, All rights Reserved | Bug report to Phone: +6288987167784
                </Typography>
            </Box>
        </Box>
    );
};

export default InvoiceList;