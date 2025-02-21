import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import axios from "axios";

const OrdersAndPayment = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrderID, setSelectedOrderID] = useState("");
    const [orderDetails, setOrderDetails] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/orders/2", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(response.data.orders.length > 0 ? response.data.orders : []);
        } catch (err) {
            setError("❌ Failed to fetch orders.");
        }
    };

    const fetchOrderDetails = async (orderID) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/orders/order/${orderID}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrderDetails(response.data.OrderID ? response.data : null);
        } catch (err) {
            setError("❌ Failed to fetch order details.");
        }
    };

    const handlePayment = async () => {
        if (!selectedOrderID || !paymentMethod) {
            alert("❌ Please select an Order and Payment Method!");
            return;
        }

        const paymentData = {
            OrderID: selectedOrderID,
            PaymentMethod: paymentMethod,
            Amount: orderDetails.TotalPrice,
            PaymentDate: new Date().toISOString().slice(0, 19).replace("T", " "),
            Status: "Completed"
        };

        try {
            const response = await axios.post("http://localhost:5000/api/payments", paymentData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.status === "success") {
                alert("✅ Payment Successful!");
                await axios.put(`http://localhost:5000/api/orders/${selectedOrderID}`, { Status: "Completed" }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchOrders();
                fetchOrderDetails(selectedOrderID);
            } else {
                setError("❌ Failed to complete payment.");
            }
        } catch (err) {
            setError("❌ Error processing payment.");
        }
    };

    return (
        <motion.div 
            className="container my-5 p-4 rounded shadow-lg"
            style={styles.container}
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-center text-white fw-bold mb-4">📦 Order & Payment</h2>

            {error && <p className="alert alert-danger text-center">{error}</p>}

            <div className="mb-4">
                <label className="fw-bold text-white">Select Order ID:</label>
                <select 
                    className="form-select"
                    value={selectedOrderID}
                    onChange={(e) => {
                        setSelectedOrderID(e.target.value);
                        fetchOrderDetails(e.target.value);
                    }}
                >
                    <option value="">-- Select Order --</option>
                    {orders.map((order) => (
                        <option key={order.OrderID} value={order.OrderID}>
                            Order {order.OrderID} - {new Date(order.OrderDate).toLocaleString()}
                        </option>
                    ))}
                </select>
            </div>

            {orderDetails && (
                <>
                    <div className="p-3 mb-4 rounded shadow-sm" style={styles.orderDetails}>
                        <h4 className="text-center text-dark fw-bold">Order Information</h4>
                        <p><strong>Order ID:</strong> {orderDetails.OrderID}</p>
                        <p><strong>Total Price:</strong> {parseFloat(orderDetails.TotalPrice).toLocaleString()} บาท</p>
                        <p><strong>Status:</strong> <span className="badge" style={getStatusStyle(orderDetails.Status)}>{orderDetails.Status}</span></p>
                    </div>

                    {orderDetails.Status !== "Completed" && (
                        <>
                            <p className="text-center text-white">Please select your preferred payment method:</p>
                            <div className="d-flex flex-column gap-3 my-4">
                                {["Credit Card", "PayPal", "Bank Transfer"].map((method) => (
                                    <motion.label 
                                        key={method} 
                                        className="d-flex align-items-center p-3 rounded border"
                                        whileHover={{ scale: 1.05, backgroundColor: "#b7e4c7" }}
                                        transition={{ duration: 0.3 }}
                                        style={styles.option}
                                    >
                                        <input type="radio" name="paymentMethod" value={method} className="me-2" onChange={(e) => setPaymentMethod(e.target.value)} />
                                        {method}
                                    </motion.label>
                                ))}
                            </div>

                            <div className="d-flex justify-content-center mt-4">
                                <motion.button 
                                    className="btn btn-lg"
                                    style={styles.btnPayment}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handlePayment}
                                >
                                    ✅ Complete Payment
                                </motion.button>
                            </div>
                        </>
                    )}
                </>
            )}
        </motion.div>
    );
};

const getStatusStyle = (status) => ({
    backgroundColor: status === "Completed" ? "#2a9d8f" : "#f4a261",
    color: "white", padding: "8px 12px", borderRadius: "5px"
});

const styles = {
    container: {
        backgroundColor: "#2d6a4f",
        color: "white",
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
    },
    orderDetails: {
        backgroundColor: "#b7e4c7",
        borderRadius: "10px",
        padding: "15px"
    },
    option: {
        fontSize: "1.2rem",
        cursor: "pointer"
    },
    btnPayment: {
        backgroundColor: "#1b4332",
        color: "white",
        padding: "12px 20px",
        borderRadius: "10px",
        fontSize: "1.2rem",
        border: "none"
    }
};

export default OrdersAndPayment;
