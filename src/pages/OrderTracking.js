import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import axios from "axios";

const OrderTracking = () => {
    const [orderId, setOrderId] = useState("");
    const [trackingData, setTrackingData] = useState(null);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    const fetchTrackingDetails = async (selectedId) => {
        if (!selectedId) return;
        try {
            const response = await axios.get(`http://localhost:5000/api/order-tracking/${selectedId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data) {
                setTrackingData(response.data);
                setError("");
            } else {
                setError("❌ ไม่พบข้อมูลการติดตาม");
                setTrackingData(null);
            }
        } catch (err) {
            console.error("❌ ข้อผิดพลาดในการดึงข้อมูล:", err);
            setError("❌ ล้มเหลวในการดึงรายละเอียดการติดตาม");
        }
    };

    return (
        <motion.div
            className="container my-5 p-4 rounded shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={styles.card}
        >
            <h2 className="text-center fw-bold mb-4" style={{ color: "#2a9d8f" }}>
                 ติดตามพัสดุ
            </h2>

            {error && <p className="alert alert-danger text-center">{error}</p>}

            <div className="mb-4">
                <label className="fw-bold" style={{ color: "#2a9d8f" }}>เลือกรหัสคำสั่งซื้อ:</label>
                <select
                    className="form-select"
                    value={orderId}
                    onChange={(e) => {
                        setOrderId(e.target.value);
                        fetchTrackingDetails(e.target.value);
                    }}
                    style={{ borderColor: "#2a9d8f" }}
                >
                    <option value="">-- เลือกคำสั่งซื้อ --</option>
                    <option value="1">คำสั่งซื้อ 1</option>
                    <option value="2">คำสั่งซื้อ 2</option>
                </select>
            </div>

            {trackingData && (
                <div className="p-3 mb-4 rounded shadow-sm" style={styles.trackingDetails}>
                    <h4 className="text-center fw-bold" style={{ color: "#2a9d8f" }}>ข้อมูลการติดตาม</h4>
                    <p className="mb-1"><strong>รหัสการติดตาม:</strong> {trackingData.TrackingID}</p>
                    <p className="mb-1"><strong>รหัสคำสั่งซื้อ:</strong> {trackingData.OrderID}</p>
                    <p className="mb-1">
                        <strong>สถานะ:</strong>
                        <span className="badge ms-2" style={getStatusStyle(trackingData.Status)}>
                            {trackingData.Status}
                        </span>
                    </p>
                    <p className="mb-1"><strong>อัปเดตเมื่อ:</strong> {new Date(trackingData.UpdatedAt).toLocaleString()}</p>
                </div>
            )}
        </motion.div>
    );
};

const getStatusStyle = (status) => ({
    backgroundColor: status === "Shipped" ? "#2a9d8f" : "#f4a261",
    color: "white",
    padding: "8px 12px",
    borderRadius: "5px",
});

const styles = {
    card: {
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#e6f2df"
    },
    trackingDetails: {
        backgroundColor: "#d0e8cd",
        borderRadius: "10px",
        padding: "15px",
    },
};

export default OrderTracking;