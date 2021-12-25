import React from "react";
import AuthProvider from "@/components/AuthProvider";
import Kin from "@/components/profile/kin";

export default function KinPage() {
    return (
        <AuthProvider>
            <Kin />
        </AuthProvider>
    )
}