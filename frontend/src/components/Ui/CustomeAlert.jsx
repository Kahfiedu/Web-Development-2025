import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import LinearProgress from '@mui/material/LinearProgress';

const CustomAlert = () => {
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'info'
    });
    const [progress, setProgress] = useState(0);

    const AUTO_DISMISS_TIME = 3000; // 3 seconds
    const PROGRESS_UPDATE_INTERVAL = 100; // Update progress every 100ms

    useEffect(() => {
        let timeoutId;
        let progressTimer;

        if (alert.open) {
            // Reset progress when alert opens
            setProgress(0);

            // Setup auto-dismiss
            timeoutId = setTimeout(() => {
                hideAlert();
            }, AUTO_DISMISS_TIME);

            // Setup progress bar
            progressTimer = setInterval(() => {
                setProgress((oldProgress) => {
                    const newProgress = oldProgress + (100 * PROGRESS_UPDATE_INTERVAL / AUTO_DISMISS_TIME);
                    return Math.min(newProgress, 100);
                });
            }, PROGRESS_UPDATE_INTERVAL);
        }

        // Cleanup timers
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            if (progressTimer) clearInterval(progressTimer);
        };
    }, [alert.open]);

    const showAlert = (message, severity) => {
        setAlert({
            open: true,
            message,
            severity
        });
    };

    const hideAlert = () => {
        setAlert(prev => ({ ...prev, open: false }));
        setProgress(0);
    };

    const AlertComponent = () => (
        <Slide
            direction="left"
            in={alert.open}
            mountOnEnter
            unmountOnExit
        >
            <div className='fixed top-4 right-4 min-w-[300px] max-w-[90vw]'>
                <Alert
                    variant="filled"
                    severity={alert.severity}
                    onClose={hideAlert}
                    sx={{
                        boxShadow: 3
                    }}
                >
                    {alert.message}
                </Alert>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4
                    }}
                />
            </div>
        </Slide>
    );

    return {
        showAlert,
        hideAlert,
        AlertComponent
    };
};

export default CustomAlert;