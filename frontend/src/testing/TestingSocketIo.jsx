import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { AlertCircle, CheckCircle, Upload, Loader } from "lucide-react";

export default function SocketIOTester() {
    const [socket, setSocket] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState("disconnected");
    const [importStatus, setImportStatus] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadResult, setUploadResult] = useState(null);
    const fileInputRef = useRef(null);

    // Connect to socket on component mount
    useEffect(() => {
        // Always create a new socket instance when the component mounts
        const newSocket = io("http://localhost:5000", {
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            autoConnect: true,
        });

        setSocket(newSocket);

        // Clean up function to disconnect socket when component unmounts
        return () => {
            if (newSocket) {
                console.log("Disconnecting socket");
                newSocket.disconnect();
            }
        };
    }, []);

    // Set up socket event listeners
    useEffect(() => {
        if (!socket) return;

        const onConnect = () => {
            console.log("✅ Connected to server, ID:", socket.id);
            setConnectionStatus("connected");
        };

        const onConnectError = (err) => {
            console.error("❌ Failed to connect:", err.message);
            setConnectionStatus("error");
        };

        const onDisconnect = (reason) => {
            console.log("Socket disconnected:", reason);
            setConnectionStatus("disconnected");
        };

        const onImportStatus = (data) => {
            console.log("✅ Import status update:", data);
            setImportStatus(data);
        };

        // Register event listeners
        socket.on("connect", onConnect);
        socket.on("connect_error", onConnectError);
        socket.on("disconnect", onDisconnect);
        socket.on("importStatus", onImportStatus);

        // If socket is already connected when this effect runs
        if (socket.connected) {
            setConnectionStatus("connected");
        }

        // Clean up event listeners
        return () => {
            socket.off("connect", onConnect);
            socket.off("connect_error", onConnectError);
            socket.off("disconnect", onDisconnect);
            socket.off("importStatus", onImportStatus);
        };
    }, [socket]);

    // Handle file upload
    const handleUpload = async () => {
        const file = fileInputRef.current.files[0];

        if (!file) {
            alert("Please select a file first!");
            return;
        }

        if (!socket || !socket.connected) {
            alert("Socket not connected! Please wait for connection or refresh the page.");
            return;
        }

        setIsUploading(true);
        setUploadResult(null);
        setImportStatus(null);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("socketId", socket.id);

        console.log("Sending file:", file.name, "with socket ID:", socket.id);

        try {
            const res = await fetch("http://localhost:5000/api/v1/excel/import/user", {
                method: "POST",
                body: formData,
                headers: {
                    "x-api-key": "ueRs7TFkywICK0yI0koUuoVu1OynOmZ",
                },
            });

            const result = await res.json();
            console.log("Upload response:", result);
            setUploadResult({
                success: res.ok,
                message: result.message || "Upload successful"
            });
        } catch (err) {
            console.error("Upload failed:", err);
            setUploadResult({
                success: false,
                message: "Upload failed: " + (err.message || "Unknown error")
            });
        } finally {
            setIsUploading(false);
        }
    };

    // Connection status indicator
    const getConnectionStatusDisplay = () => {
        switch (connectionStatus) {
            case "connected":
                return (
                    <div className="flex items-center text-green-500">
                        <CheckCircle size={16} className="mr-2" />
                        <span>Connected (ID: {socket?.id || "unknown"})</span>
                    </div>
                );
            case "error":
                return (
                    <div className="flex items-center text-red-500">
                        <AlertCircle size={16} className="mr-2" />
                        <span>Connection Error</span>
                    </div>
                );
            case "disconnected":
                return (
                    <div className="flex items-center text-yellow-500">
                        <AlertCircle size={16} className="mr-2" />
                        <span>Disconnected</span>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center text-gray-500">
                        <Loader size={16} className="mr-2 animate-spin" />
                        <span>Connecting...</span>
                    </div>
                );
        }
    };

    return (
        <div className="bg-gray-800 text-white p-8 rounded-lg max-w-3xl mx-auto mt-20">
            <h2 className="text-2xl font-bold mb-6">Excel Import with Socket.IO</h2>

            {/* Connection Status */}
            <div className="mb-6 p-4 bg-gray-700 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Socket Connection</h3>
                {getConnectionStatusDisplay()}

                <button
                    className="mt-2 px-4 py-1 bg-blue-600 rounded-md hover:bg-blue-700 text-sm"
                    onClick={() => {
                        if (socket) {
                            if (socket.connected) {
                                socket.disconnect();
                            } else {
                                socket.connect();
                            }
                        }
                    }}
                >
                    {socket?.connected ? "Disconnect" : "Reconnect"}
                </button>
            </div>

            {/* File Upload Section */}
            <div className="mb-6 p-4 bg-gray-700 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Upload Excel File</h3>
                <div className="flex flex-col md:flex-row gap-3">
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept=".xlsx, .xls"
                        className="p-2 rounded-md bg-gray-600 flex-grow"
                        disabled={!socket?.connected || isUploading}
                    />
                    <button
                        onClick={handleUpload}
                        disabled={!socket?.connected || isUploading}
                        className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 flex items-center justify-center disabled:bg-gray-500"
                    >
                        {isUploading ? (
                            <>
                                <Loader size={16} className="mr-2 animate-spin" />
                                <span>Uploading...</span>
                            </>
                        ) : (
                            <>
                                <Upload size={16} className="mr-2" />
                                <span>Upload</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Upload Result */}
                {uploadResult && (
                    <div className={`mt-3 p-3 rounded-md ${uploadResult.success ? 'bg-green-800/50' : 'bg-red-800/50'}`}>
                        <p className="text-sm">{uploadResult.message}</p>
                    </div>
                )}
            </div>

            {/* Import Status */}
            <div className="p-4 bg-gray-700 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Import Status</h3>

                {importStatus ? (
                    <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-gray-600 p-3 rounded-md">
                                <div className="text-sm text-gray-300">Total</div>
                                <div className="text-xl font-bold">{importStatus.total}</div>
                            </div>
                            <div className="bg-green-800/50 p-3 rounded-md">
                                <div className="text-sm text-gray-300">Processed</div>
                                <div className="text-xl font-bold">{importStatus.processed}</div>
                            </div>
                            <div className="bg-yellow-800/50 p-3 rounded-md">
                                <div className="text-sm text-gray-300">Skipped</div>
                                <div className="text-xl font-bold">{importStatus.skipped}</div>
                            </div>
                        </div>

                        {importStatus.skippedDetails && importStatus.skippedDetails.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold mb-2">Skipped Records Details:</h4>
                                <div className="max-h-64 overflow-y-auto">
                                    <ul className="space-y-2">
                                        {importStatus.skippedDetails.map((item, idx) => (
                                            <li key={idx} className="bg-gray-600 p-2 rounded-md text-sm">
                                                <pre className="whitespace-pre-wrap">{JSON.stringify(item, null, 2)}</pre>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-400">Waiting for import status updates...</p>
                )}
            </div>
        </div>
    );
}