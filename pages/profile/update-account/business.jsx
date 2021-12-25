import React from "react";
import AuthProvider from "@/components/AuthProvider";
import Business from "@/components/profile/business";

export default function BusinessPage () {
    return (
        <AuthProvider>
            <Business />
        </AuthProvider>
    )
}