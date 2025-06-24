import { useState } from 'react';
import {
    Typography,
    Button,
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    TextField,
} from '@mui/material';

// Material-UI Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TagIcon from '@mui/icons-material/Tag';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const BlogDetailAdmin = () => {
    const [blogData] = useState({
        id: 1,
        title: 'Title',
        date: '03 Mei 2023, oleh Kahfi Edu',
        status: 'Publish',
        image: 'https://via.placeholder.com/400x300/4caf50/ffffff?text=Blog+Image',
        basicInfo: {
            judul: 'Title',
            slug: 'title'
        },
        description: `Tincidunt Donec ex ac porta enim, efficitur, at odio Sed id dui ac tortor. Ut faucibus placerat non nibh efficitur, eget elit elit sed nisl gravida molestusada ac Lorem vitae non, sapien commodo Nunc Ut eget locus urna. Donec Nam faucibus. Tincidunt Donec ex ac porta enim, efficitur, at odio Sed id dui ac tortor. Ut faucibus placerat non nibh efficitur, eget elit elit sed nisl gravida molestosada ac Lorem vitae non, sapien commodo Nunc Ut eget locus urna. Donec Nam faucibus. Tincidunt Donec ex ac porta enim, efficitur, at odio Sed id dui ac tortor. Ut faucibus placerat non nibh efficitur, eget elit elit sed nisl gravida molestosada ac Lorem vitae non, sapien commodo Nunc Ut eget locus urna. Donec Nam faucibus. Tincidunt Donec ex ac porta enim, efficitur, at odio Sed id dui ac tortor. Ut faucibus placerat non nibh efficitur, eget elit elit sed nisl gravida molestosada ac Lorem vitae non, sapien commodo Nunc Ut eget locus urna. Donec Nam faucibus. Tincidunt Donec ex ac porta enim, efficitur, at odio Sed id dui ac tortor. Ut faucibus placerat non nibh efficitur, eget elit elit sed nisl gravida molestosada ac Lorem vitae non, sapien commodo Nunc Ut eget locus urna. Donec Nam faucibus.`,
        statusInfo: {
            status: 'Featured',
            publish: 'Active'
        },
        dateInfo: {
            createdDate: '3/3/2023',
            updateDate: '12/6/2023',
            deleteDate: '6/7/2023'
        },
        tags: ['#Education', '#Information']
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Publish':
                return 'success'; // MUI color variant
            case 'Featured':
                return 'warning';
            case 'Draft':
                return 'info'; // Use info for gray-like neutral
            default:
                return 'primary';
        }
    };

    const getPublishColor = (publish) => {
        switch (publish) {
            case 'Active':
                return { backgroundColor: 'success.light', color: 'success.dark' }; // MUI theme colors
            case 'Inactive':
                return { backgroundColor: 'error.light', color: 'error.dark' };
            default:
                return { backgroundColor: 'grey.200', color: 'grey.800' };
        }
    };


    return (
        <Box sx={{ minHeight: '100vh' }}>

            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: 'grey.600', '&:hover': { backgroundColor: 'grey.700' } }}
                    startIcon={<ArrowBackIcon fontSize="small" />}
                >
                    Back
                </Button>
                <Stack direction="row" spacing={1.5}>
                    <Button
                        variant="contained"
                        color="primary" // MUI's primary color
                        startIcon={<EditIcon fontSize="small" />}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error" // MUI's error color
                        startIcon={<DeleteIcon fontSize="small" />}
                    >
                        Delete
                    </Button>
                </Stack>
            </Box>

            <Grid container spacing={3}>
                {/* Left Column - Image and Basic Info */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Stack spacing={3}>
                        {/* Image Section */}
                        <Card sx={{ borderRadius: '8px', boxShadow: 1, border: '1px solid', borderColor: 'grey.200' }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Typography variant="h6" component="h3" fontWeight="semibold" color="grey.800">
                                        Image
                                    </Typography>
                                    <Chip
                                        label={blogData.status}
                                        color={getStatusColor(blogData.status)}
                                        size="small"
                                        sx={{ fontWeight: 'semibold' }}
                                    />
                                </Box>
                                <CardMedia
                                    component="img"
                                    height="192" // h-48 in tailwind = 12rem = 192px
                                    image={blogData.image}
                                    alt="Blog"
                                    sx={{ borderRadius: '8px', objectFit: 'cover' }}
                                />
                            </CardContent>
                        </Card>

                        {/* Basic Information */}
                        <Card sx={{ borderRadius: '8px', boxShadow: 1, border: '1px solid', borderColor: 'grey.200' }}>
                            <CardContent>
                                <Typography variant="h6" component="h3" fontWeight="semibold" color="grey.800" mb={2}>
                                    Basic Information
                                </Typography>
                                <Stack spacing={2}>
                                    <TextField
                                        label="Judul"
                                        value={blogData.basicInfo.judul}
                                        InputProps={{ readOnly: true }}
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        sx={{ '& .MuiInputBase-input': { backgroundColor: 'grey.50' } }}
                                    />
                                    <TextField
                                        label="Slug"
                                        value={blogData.basicInfo.slug}
                                        InputProps={{ readOnly: true }}
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        sx={{ '& .MuiInputBase-input': { backgroundColor: 'grey.50' } }}
                                    />
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Status Information */}
                        <Card sx={{ borderRadius: '8px', boxShadow: 1, border: '1px solid', borderColor: 'grey.200' }}>
                            <CardContent>
                                <Typography variant="h6" component="h3" fontWeight="semibold" color="grey.800" mb={2}>
                                    Status Information
                                </Typography>
                                <Stack spacing={1.5}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" fontWeight="medium" color="grey.600">
                                            Status
                                        </Typography>
                                        <Chip
                                            label={blogData.statusInfo.status}
                                            color={getStatusColor(blogData.statusInfo.status)}
                                            size="small"
                                            sx={{ fontWeight: 'semibold' }}
                                        />
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" fontWeight="medium" color="grey.600">
                                            Publish
                                        </Typography>
                                        <Chip
                                            label={blogData.statusInfo.publish}
                                            size="small"
                                            sx={{ fontWeight: 'semibold', ...getPublishColor(blogData.statusInfo.publish) }}
                                        />
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Date Information */}
                        <Card sx={{ borderRadius: '8px', boxShadow: 1, border: '1px solid', borderColor: 'grey.200' }}>
                            <CardContent>
                                <Typography variant="h6" component="h3" fontWeight="semibold" color="grey.800" mb={2}>
                                    Date Information
                                </Typography>
                                <Stack spacing={1.5}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" fontWeight="medium" color="grey.600" display="flex" alignItems="center" gap={1}>
                                            <CalendarTodayIcon sx={{ fontSize: 14 }} />
                                            Created Date
                                        </Typography>
                                        <Typography variant="body2" color="grey.700">
                                            {blogData.dateInfo.createdDate}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" fontWeight="medium" color="grey.600" display="flex" alignItems="center" gap={1}>
                                            <AccessTimeIcon sx={{ fontSize: 14 }} />
                                            Update Date
                                        </Typography>
                                        <Typography variant="body2" color="grey.700">
                                            {blogData.dateInfo.updateDate}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" fontWeight="medium" color="grey.600" display="flex" alignItems="center" gap={1}>
                                            <DeleteIcon sx={{ fontSize: 14 }} />
                                            Delete Date
                                        </Typography>
                                        <Typography variant="body2" color="grey.700">
                                            {blogData.dateInfo.deleteDate}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Tags Information */}
                        <Card sx={{ borderRadius: '8px', boxShadow: 1, border: '1px solid', borderColor: 'grey.200' }}>
                            <CardContent>
                                <Typography variant="h6" component="h3" fontWeight="semibold" color="grey.800" mb={2} display="flex" alignItems="center" gap={1}>
                                    <TagIcon sx={{ fontSize: 16 }} />
                                    Tags Information
                                </Typography>
                                <Typography variant="body2" fontWeight="medium" color="grey.600" mb={1}>
                                    Tags
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap">
                                    {blogData.tags.map((tag, index) => (
                                        <Chip
                                            key={index}
                                            label={tag}
                                            size="small"
                                            sx={{ backgroundColor: 'primary.light', color: 'primary.dark', border: '1px solid', borderColor: 'primary.main' }}
                                        />
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>

                {/* Right Column - Content */}
                <Grid size={{ xs: 12, md: 8 }}> {/* lg:col-span-2 */}
                    <Card sx={{ borderRadius: '8px', boxShadow: 1, border: '1px solid', borderColor: 'grey.200' }}>
                        {/* Blog Header */}
                        <CardContent sx={{ pb: 0, borderBottom: '1px solid', borderColor: 'grey.200' }}>
                            <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
                                <Box sx={{ flex: 1, pr: 2 }}>
                                    <Typography variant="h4" component="h1" fontWeight="bold" color="grey.800" mb={1}>
                                        {blogData.title}
                                    </Typography>
                                    <Typography variant="body2" color="grey.600" display="flex" alignItems="center" gap={0.5}>
                                        <CalendarTodayIcon sx={{ fontSize: 14 }} />
                                        {blogData.date}
                                    </Typography>
                                </Box>
                                <CardMedia
                                    component="img"
                                    image={blogData.image}
                                    alt="Blog preview"
                                    sx={{ width: 128, height: 96, objectFit: 'cover', borderRadius: '8px', boxShadow: 1 }} // w-32 h-24
                                />
                            </Box>
                        </CardContent>

                        {/* Blog Content */}
                        <CardContent sx={{ pt: 3 }}>
                            <Typography variant="h6" component="h3" fontWeight="semibold" color="grey.800" mb={2}>
                                Description
                            </Typography>
                            <Typography variant="body1" color="grey.700" sx={{ lineHeight: 1.75, textAlign: 'justify' }}>
                                {blogData.description}
                            </Typography>

                            {/* Tags at bottom */}
                            <Box mt={3} pt={2} sx={{ borderTop: '1px solid', borderColor: 'grey.200' }}>
                                <Typography variant="body2" color="grey.600" display="flex" alignItems="center" gap={1} mb={1}>
                                    <TagIcon sx={{ fontSize: 14 }} />
                                    <Typography component="span" fontWeight="medium">Tags:</Typography>
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap">
                                    {blogData.tags.map((tag, index) => (
                                        <Chip
                                            key={index}
                                            label={tag}
                                            size="small"
                                            sx={{ backgroundColor: 'grey.100', color: 'grey.700', borderRadius: '16px', border: '1px solid', borderColor: 'grey.300', '&:hover': { backgroundColor: 'grey.200' } }}
                                        />
                                    ))}
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BlogDetailAdmin;