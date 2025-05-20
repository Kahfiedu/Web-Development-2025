import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Chip
} from "@mui/material";

export default function ClassListCard({ course }) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" mb={1}>Daftar Kelas</Typography>

                {course.classes?.length > 0 ? (
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell>Nama Kelas</TableCell>
                                    <TableCell>Pengajar</TableCell>
                                    <TableCell>Jadwal</TableCell>
                                    <TableCell>Periode</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {course.classes.map((kelas, idx) => (
                                    <TableRow key={kelas.id}>
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell>{kelas.name}</TableCell>
                                        <TableCell>{kelas.teacher?.name || '-'}</TableCell>
                                        <TableCell>{kelas.schedule}</TableCell>
                                        <TableCell>
                                            {kelas.formattedStart} - {" "}
                                            {kelas.formattedEnd}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={kelas.isActive ? "Aktif" : "Tidak Aktif"}
                                                color={kelas.isActive ? "success" : "default"}
                                                size="small"
                                                sx={{ borderRadius: "8px" }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Box textAlign="center" py={2}>
                        <Typography variant="body2" color="text.secondary">
                            Belum ada kelas yang tersedia
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
