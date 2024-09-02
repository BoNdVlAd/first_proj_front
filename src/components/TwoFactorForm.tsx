import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import APIWrapper from '../API/APIWrapper'
import { useNavigate } from 'react-router-dom'

const TwoFactorSetup: React.FC = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
    const [code, setCode] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const api = APIWrapper()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchQr = async () => {
            try {
                const data = await api.get('generate-2fa-secret')
                console.log(data.data.qr_code_url)
                setQrCodeUrl(data.data.qr_code_url)
            } catch (e) {
                console.log('Error: ', e)
            }
        }

        fetchQr()
    }, [])

    const handleVerify = async () => {
        try {
            const body = {
                code: code,
            }
            const response = await api.post('verify-2fa-code', body)

            if (response.status === 200) {
                navigate('/menu')
            } else {
                console.log('Login failed: ', response)
            }
        } catch (e) {
            console.log('Error: ', e)
        }
    }

    return (
        <div>
            <h2>Set up Two-Factor Authentication</h2>
            {qrCodeUrl && <QRCode value={qrCodeUrl} />}
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter verification code"
            />
            <button onClick={handleVerify}>Verify Code</button>
            {message && <p>{message}</p>}
        </div>
    )
}

export default TwoFactorSetup
