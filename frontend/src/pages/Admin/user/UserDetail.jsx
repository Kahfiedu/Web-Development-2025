import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import {
    Grid, Paper, Typography, Avatar, Box, Button, TextField, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    TablePagination
} from "@mui/material"

import { useLoading } from "@hooks/useLoading"
import useAlert from "@hooks/useAlert"

import userService from "@services/userService"

import CustomeCalender from "@components/UI/CustomeCalender";
import { HiChat, HiDownload } from "react-icons/hi"
import { capitalizeWords } from "@utils/formatedFont"

export default function UserDetail() {
    const [user, setUser] = useState(null)
    const [notFound, setNotFound] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [searchParams] = useSearchParams()
    const userId = searchParams.get('userId')
    const { showLoading, hideLoading } = useLoading()
    const { showAlert } = useAlert()

    const fetchUser = async () => {
        if (!userId) return;
        showLoading()
        try {
            const res = await userService.getUserById(userId);
            if (res.success && res.user) {
                setUser(res.user)
                setNotFound(false)
            } else {
                setUser(null)
                setNotFound(true)
            }
        } catch (error) {
            setUser(null)
            setNotFound(true)
            showAlert(error.message || "User tidak ditemukan", "error")
        } finally {
            hideLoading()
        }
    }

    useEffect(() => {
        fetchUser();
    }, [userId]);

    const data = Array.from({ length: 13 }, (_, i) => ({
        course: "Web Development",
        invoice: "#FA613145",
        date: "20 Feb 2025",
        amount: "Rp. 150.000",
        status: i === 3 ? "Gagal" : i === 1 ? "Proses" : "Berhasil"
    }))

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    if (notFound) {
        return (
            <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography color="default" variant="h5">Pengguna tidak ditemukan</Typography>
            </Box>
        )
    }

    if (!user) return null;

    console.log(user.fullAddress)

    return (
        <Box>
            <Grid container spacing={3}>
                {/* Kiri */}
                <Grid size={{ xs: 12, md: 8 }}>
                    {/* Header */}
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box>
                                <Typography color="green" fontWeight="bold">Murid</Typography>
                                <Typography variant="h5">{user.name}</Typography>
                            </Box>
                            <Button startIcon={<HiChat />} variant="contained" color="success">Message</Button>
                        </Box>
                    </Paper>

                    {/* Informasi umum */}
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="stretch"  // supaya anaknya stretch full height
                            mb={2}
                            height="100%"         // supaya Box ini full height parentnya
                            minHeight={120}       // opsional, biar minimal cukup tinggi
                        >
                            <Avatar src={user.avatar || `${user.name}`} alt={user.name} sx={{ width: 76, height: 76, mr: 2, alignSelf: 'center' }} />

                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="space-between"
                                mr={2}
                            >
                                <Typography><strong>Email</strong></Typography>
                                <Typography><strong>Phone Number</strong></Typography>
                                <Typography><strong>Alamat</strong></Typography>
                                <Typography><strong>Terdaftar</strong></Typography>
                            </Box>

                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="space-between"
                                flex={1}
                            >
                                <Typography>: {user.email}</Typography>
                                <Typography>: {user.phone || '-'}</Typography>
                                <Typography>
                                    : {capitalizeWords(user.fullAddress)}
                                </Typography>

                                <Typography>: {user.formattedCreatedAt}</Typography>
                            </Box>
                        </Box>
                    </Paper>

                    {/* Card statistik */}
                    <Grid container spacing={2} mb={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper elevation={2} sx={{ p: 2 }}>
                                <Typography color="text.secondary">Course</Typography>
                                <Box display="flex" justifyContent="space-evenly">
                                    <Box textAlign="center">
                                        <Typography color="orange">Progress</Typography>
                                        <Typography>2</Typography>
                                    </Box>
                                    <Box textAlign="center">
                                        <Typography color="green">Selesai</Typography>
                                        <Typography>10</Typography>
                                    </Box>
                                    <Box textAlign="center">
                                        <Typography>Total</Typography>
                                        <Typography>12</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6, height: '100%' }} >
                            <Paper elevation={2} sx={{ p: 2, height: "100%" }} >
                                <Typography color="text.secondary">Pembayaran</Typography>
                                <Typography variant="h6">Rp. 1.000.000</Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Tabel pembayaran */}
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="subtitle1">Data Pembayaran</Typography>
                            <Box>
                                <Button startIcon={<HiDownload />} variant="contained" size="small" sx={{ mr: 1 }}>Export</Button>
                                <Button startIcon={<HiDownload />} variant="contained" size="small" color="success">Excel</Button>
                            </Box>
                        </Box>

                        <Box mb={2} display="flex" justifyContent="flex-end">
                            <TextField size="small" placeholder="Cari invoice" />
                        </Box>

                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Course</TableCell>
                                        <TableCell>Invoice</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Aksi</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell><a href="#">{row.course}</a></TableCell>
                                            <TableCell>{row.invoice}</TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.amount}</TableCell>
                                            <TableCell>
                                                <Typography color={
                                                    row.status === "Gagal" ? "error" : row.status === "Proses" ? "warning.main" : "success.main"
                                                }>
                                                    {row.status}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Button size="small" variant="text">Detail</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Pagination */}
                        <TablePagination
                            component="div"
                            count={data.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 10, 25]}
                        />
                    </Paper>
                </Grid>

                {/* Kanan: Kalender */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                        <CustomeCalender />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}
