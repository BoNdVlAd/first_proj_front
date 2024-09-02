import React, { useEffect, useState } from 'react'
import APIWrapper from '../API/APIWrapper'
import QRCode from 'react-qr-code'

const MakeTwoFactorAuth = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
    const api = APIWrapper()

    useEffect(() => {
        const fetchQr = async () => {
            try {
                const data = await api.get('generate-2fa-secret')
                setQrCodeUrl(data.data.qr_code_url)
            } catch (e) {
                console.log('Error: ', e)
            }
        }

        fetchQr()
    }, [])

    return (
        <div>
            <h2>Set up Two-Factor Authentication</h2>
            {qrCodeUrl && <QRCode value={qrCodeUrl} />}
        </div>
    )
}
export default MakeTwoFactorAuth
