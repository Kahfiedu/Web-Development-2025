import React, { useState } from 'react';
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
    Breadcrumbs,
    Link,
    Stack,
    Menu,
    MenuItem,
} from '@mui/material';

// Material-UI Icons
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ExtensionIcon from '@mui/icons-material/Extension'; // Using Extension for Puzzle/Program
import SchoolIcon from '@mui/icons-material/School'; // Using School for GraduationCap/Kelas
import ArticleIcon from '@mui/icons-material/Article'; // Using Article for FileText/Blog
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListIcon from '@mui/icons-material/List';
import MessageIcon from '@mui/icons-material/Message';

const InvoiceDetail = () => {
    const [anchorElUser, setAnchorElUser] = useState(null); // For user menu

    // Invoice data
    const invoiceData = {
        invoiceNumber: '#72997326',
        date: '07 Feb 2025',
        from: {
            name: 'Jhon doe',
            phone: '087582525534',
            email: 'jhonedoe@example.com'
        },
        to: {
            company: 'Kahfi Education',
            method: 'Transfer',
            bank: 'BCA',
            noRek: '700362836',
            account: '002154875412396'
        },
        items: [
            {
                id: 1,
                course: 'Mengaji',
                class: 'Kelas A',
                serialNumber: '#P060525A1',
                quantity: 2,
                price: 150000,
                total: 300000
            }
        ],
        paymentDue: '12 Feb 2025',
        totalAmount: 300000,
        discount: 30000,
        finalAmount: 270000
    };

    const formatCurrency = (amount) => {
        return `Rp. ${amount.toLocaleString('id-ID')}`;
    };

    const handleUserMenuClick = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ minHeight: '100vh' }}>

            <Box>

                {/* Action Buttons */}
                <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1.5} mb={3}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: 'green.600', '&:hover': { backgroundColor: 'green.700' } }}
                        startIcon={<DownloadIcon fontSize="small" />}
                    >
                        Simpan
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: 'orange.500', '&:hover': { backgroundColor: 'orange.600' } }}
                        startIcon={<PrintIcon fontSize="small" />}
                    >
                        Print
                    </Button>
                </Box>

                {/* Invoice Content */}
                <Card sx={{ borderRadius: '8px', boxShadow: 1 }}>
                    <CardContent sx={{ p: 4 }}>
                        {/* Invoice Header */}
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={4}>
                            <Typography variant="h3" component="h1" fontWeight="bold" color="grey.900">
                                Invoice
                            </Typography>
                            <Typography variant="h5" component="div" fontWeight="bold" color="grey.900">
                                {invoiceData.date}
                            </Typography>
                        </Box>

                        {/* From and To Section */}
                        <Grid container spacing={4} mb={4}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="body2" fontWeight="medium" color="grey.500" mb={1.5}>
                                    From
                                </Typography>
                                <Stack spacing={0.5}>
                                    <Typography variant="body1" fontWeight="semibold" color="grey.900">
                                        {invoiceData.from.name}
                                    </Typography>
                                    <Typography variant="body2" color="grey.600">
                                        Phone : {invoiceData.from.phone}
                                    </Typography>
                                    <Typography variant="body2" color="grey.600">
                                        Email : {invoiceData.from.email}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }} alignItems="end" textAlign="end" display={'flex'} flexDirection="column">
                                <Typography variant="body2" fontWeight="medium" color="grey.500" mb={1.5}>
                                    To
                                </Typography>
                                <Stack spacing={0.5}>
                                    <Typography variant="body1" fontWeight="semibold" color="grey.900">
                                        {invoiceData.to.company}
                                    </Typography>
                                    <Typography variant="body2" color="grey.600">
                                        Method : {invoiceData.to.method}
                                    </Typography>
                                    <Typography variant="body2" color="grey.600">
                                        Bank : {invoiceData.to.bank}
                                    </Typography>
                                    <Typography variant="body2" color="grey.600">
                                        No Rek : {invoiceData.to.noRek}
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>

                        {/* Invoice Details */}
                        <Box mb={4}>
                            <Grid container spacing={2} sx={{ mb: 1 }}>
                                <Grid size={{ xs: 12, md: 3 }} textAlign="center">
                                    <Typography variant="body2" color="grey.600">
                                        Invoice : {invoiceData.invoiceNumber}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, md: 3 }} textAlign="center">
                                    <Typography variant="body2" color="grey.600">
                                        Method : {invoiceData.to.method}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, md: 3 }} textAlign="center">
                                    <Typography variant="body2" color="grey.600">
                                        Bank : {invoiceData.to.bank}
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, md: 3 }} textAlign="center">
                                    <Typography variant="body2" color="grey.600">
                                        Account : {invoiceData.to.account}
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Box>

                        {/* Invoice Table */}
                        <TableContainer sx={{ mb: 4, border: '1px solid', borderColor: 'grey.200', borderRadius: '4px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: 'grey.50' }}>
                                        <TableCell sx={{ py: 1.5, px: 2, fontWeight: 'medium', color: 'grey.900' }}>#</TableCell>
                                        <TableCell sx={{ py: 1.5, px: 2, fontWeight: 'medium', color: 'grey.900' }}>Course</TableCell>
                                        <TableCell sx={{ py: 1.5, px: 2, fontWeight: 'medium', color: 'grey.900' }}>Class</TableCell>
                                        <TableCell sx={{ py: 1.5, px: 2, fontWeight: 'medium', color: 'grey.900' }}>Serial Number</TableCell>
                                        <TableCell sx={{ py: 1.5, px: 2, fontWeight: 'medium', color: 'grey.900' }}>Quantity</TableCell>
                                        <TableCell sx={{ py: 1.5, px: 2, fontWeight: 'medium', color: 'grey.900' }}>Price</TableCell>
                                        <TableCell sx={{ py: 1.5, px: 2, fontWeight: 'medium', color: 'grey.900' }}>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {invoiceData.items.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell sx={{ py: 1.5, px: 2 }}>{index + 1}</TableCell>
                                            <TableCell sx={{ py: 1.5, px: 2 }}>{item.course}</TableCell>
                                            <TableCell sx={{ py: 1.5, px: 2 }}>{item.class}</TableCell>
                                            <TableCell sx={{ py: 1.5, px: 2 }}>{item.serialNumber}</TableCell>
                                            <TableCell sx={{ py: 1.5, px: 2 }}>{item.quantity}</TableCell>
                                            <TableCell sx={{ py: 1.5, px: 2 }}>{formatCurrency(item.price)}</TableCell>
                                            <TableCell sx={{ py: 1.5, px: 2 }}>{formatCurrency(item.total)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Payment Summary */}
                        <Box display="flex" justifyContent="flex-end">
                            <Stack spacing={1.5} sx={{ width: '320px' }}> {/* w-80 */}
                                <Typography variant="body2" color="green.600" fontWeight="medium">
                                    Payment Due {invoiceData.paymentDue}
                                </Typography>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" fontWeight="semibold">Total :</Typography>
                                    <Typography variant="h6" fontWeight="semibold">{formatCurrency(invoiceData.totalAmount)}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="body2" color="grey.600">Disc (10%) :</Typography>
                                    <Typography variant="body2" color="grey.600">{formatCurrency(invoiceData.discount)}</Typography>
                                </Box>
                                <Box sx={{ borderTop: '1px solid', borderColor: 'grey.200', pt: 1.5 }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h5" fontWeight="bold">Amount</Typography>
                                        <Typography variant="h5" fontWeight="bold">{formatCurrency(invoiceData.finalAmount)}</Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    backgroundColor: 'green.600',
                    color: 'white',
                    textAlign: 'center',
                    py: 2,
                    mt: 4,
                }}
            >
                <Typography variant="body2">
                    Copyright &copy; 2025 Kahfi Education, All rights Reserved | Bug report to Phone: +6288987167784
                </Typography>
            </Box>
        </Box>
    );
};

export default InvoiceDetail;