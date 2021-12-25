import React from "react";
import AuthProvider from "@/components/AuthProvider";
import Contact from "@/components/profile/contact";

export default function ContactPage () {
    return (
        <AuthProvider>
            <Contact />
        </AuthProvider>
    )
}