import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import useAlert from "../../../hooks/useAlert";
import { useLoading } from "../../../hooks/useLoading";
import { Box, Typography } from "@mui/material";

function CourseDetail() {
    const [course, setCourse] = useState(null);
    const { showLoading, hideLoading } = useLoading();
    const { showAlert } = useAlert();
    const [searchParams] = useSearchParams()
    const courseId = searchParams.get('courseId')

    const fetchCourse = async () => {
        if (!courseId) {
            showAlert("Id Course tidak ditemukan", "error")
            return;
        };
        showLoading();
        try {
            const res = await courseService.getCourseById(courseId);
            if (res.success) {
                setCourse(res.course);
            }
        } catch (error) {
            showAlert(error.message, "error");
        } finally {
            hideLoading();
        }
    };

    useEffect(() => {
        fetchCourse()
    }, []);

    if (!course) {
        return (
            <Box>
                <Typography textAlign="center">Course tidak ditemukan</Typography>
            </Box>
        )
    }
    return (
        <div>
            <h1>Halaman Detail Kelas</h1>
        </div>
    )
}

export default CourseDetail
