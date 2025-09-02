// src/components/ErrorPage.tsx
import React from "react";
import { useNavigate } from "react-router";

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1 style={{ color: "red" }}>❌ ERROR!</h1>
            <p>Page not found</p>
            <button
                onClick={() => navigate("/home/luke")}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "none",
                    background: "blue",
                    color: "white",
                    cursor: "pointer",
                }}
            >
                Back to HOMEPAGE
            </button>
        </div>
    );
};

export default ErrorPage;
