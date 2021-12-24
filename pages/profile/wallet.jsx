import React from "react"
import AuthProvider from "components/AuthProvider"
import Wallet from "components/profile/wallet"

export default function WalletPage () {
    return (
        <AuthProvider>
            <Wallet />
        </AuthProvider>
    )
}