import { sendMagicLink, verifyToken } from '@src/functions/api';
import { useAuthStore } from '@src/store';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

enum SigninState {
    MAIL, AUTH
}

const Signin = () => {
    const { isLoggedIn, setToken } = useAuthStore();
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState<SigninState>(SigninState.MAIL)


    const [email, setEmail] = useState("")
    const [magicToken, setMagicToken] = useState("")
    const [adminKey, setAdminKey] = useState("")

    const handleEmailSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            setLoading(false);
            return;
        }

        setLoading(true)
        sendMagicLink({ email }).then(res => {
            if (res.error) {
                toast.error("Email sending failed 🤦‍♂️")
                setLoading(false)
            } else {
                toast.success("Check inbox for token 💪")
                setLoading(false)
                setState(SigninState.AUTH)
            }
        })

    }

    const handleTokenSubmit = () => {
        const magicTokenRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/;
        if (!magicTokenRegex.test(magicToken)) {
            toast.error("Please enter a valid token");
            setLoading(false);
            return;
        }

        setLoading(true)
        verifyToken({ magic_token: magicToken, admin_key: adminKey }).then(res => {
            if (res.error) {
                toast.error("Token verification failed 🤦‍♂️")
                setLoading(false)
            } else {
                toast.success("Signin Successfull 💪")
                setLoading(false)
                setToken({
                    accessToken: res.data.accessToken,
                    adminToken: res.data.adminToken
                })
                window.location.reload()
            }
        })
    }

    if (isLoggedIn()) {
        return <Navigate to="/images" />
    }

    return (
        <div className='bg-base-100 flex h-screen w-full justify-center items-center'>
            <div className="card p-5 bg-base-200 border border-base-300">
                <div className="font-semibold text-xl">Sign In</div>
                <div className=' mb-5'>Welcome to Tourbuzz</div>
                {state === SigninState.MAIL && (
                    <>
                        <div>
                            <label className="label">Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" className="input input-bordered w-96" />
                        </div>
                        <button className="btn w-full btn-info mt-3" onClick={handleEmailSubmit} disabled={loading}>
                            Send Verification Link
                        </button>
                        <button className="link link-hover mt-3" onClick={() => setState(SigninState.AUTH)}>Already have a token ?</button>
                    </>
                )}
                {state === SigninState.AUTH && (
                    <>
                        <div>
                            <label className="label">Mailed Token</label>
                            <input value={magicToken} onChange={e => setMagicToken(e.target.value)} type="text" placeholder="Mailed Token" className="input input-bordered w-96" />
                        </div>
                        <div>
                            <label className="label">Admin Key</label>
                            <input value={adminKey} onChange={e => setAdminKey(e.target.value)} type="text" placeholder="Admin Token" className="input input-bordered w-96" />
                        </div>
                        <button className="btn w-full btn-info mt-3" onClick={handleTokenSubmit} disabled={loading}>
                            Verify Token
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Signin