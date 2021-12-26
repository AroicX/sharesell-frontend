import React from "react"
import AuthProvider from "@/components/AuthProvider"
import Layout from "@/components/layout"
import Profile from "@/components/profile"

export default function ProfilePage () {
    return (
        <AuthProvider>
            <Layout>
                <Profile />
            </Layout>
        </AuthProvider>
    )
}