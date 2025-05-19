import { Card, CardContent, InputLabel, Stack, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

export default function GeneralInfoCard({ control, errors, submitting }) {

    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h6" mb={1}>Basic Infromation</Typography>
                    <div>
                        <InputLabel shrink>Judul</InputLabel>
                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: "Judul wajib diisi" }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                    disabled={submitting}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <InputLabel shrink>Deskripsi</InputLabel>
                        <Controller
                            name="description"
                            control={control}
                            rules={{ required: "Deskripsi wajib diisi" }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    multiline
                                    rows={4}
                                    fullWidth
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                    disabled={submitting}
                                />
                            )}
                        />
                    </div>
                </Stack>
            </CardContent>
        </Card>
    );
}
