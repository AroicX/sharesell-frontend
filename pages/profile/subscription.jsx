import React from "react";
import AuthProvider from "components/AuthProvider";
import Subscription from "components/profile/subscription";

export default function SubscriptionPage() {
    return (
        <AuthProvider>
            <Subscription />
        </AuthProvider>
    )
}