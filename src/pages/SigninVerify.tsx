import { verifyToken } from '@src/functions/api';
import { useAuthStore } from '@src/store';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SigninVerify = () => {
    const [searchParams] = useSearchParams();
    const { isLoggedIn, setToken } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [magicFilled, setMagicFilled] = useState(false)

    const [magicToken, setMagicToken] = useState("")
    const [adminKey, setAdminKey] = useState("")

    useEffect(() => {
      const magic = searchParams.get("magic");
      if(magic && magic?.length > 1){
        const now = Math.floor(Date.now() / 1000)
        const decoded = jwtDecode(magic)
        if (decoded.exp && now < decoded.exp) {
            setMagicToken(magic)
            setMagicFilled(true)
        } else {
            toast.error("Magic link expired")
        }
      }
    }, [searchParams])
    

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
                setToken({
                    accessToken: res.data.access_token,
                    adminToken: res.data.admin_token
                })
                setLoading(false)
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
                <div>
                    <label className="label">Mailed Token</label>
                    <input value={magicToken} onChange={e => setMagicToken(e.target.value)} type="password" placeholder="Mailed Token" className="input input-bordered disabled:input-success w-96" disabled={magicFilled} />
                </div>
                <div>
                    <label className="label">Secret Key</label>
                    <input value={adminKey} onChange={e => setAdminKey(e.target.value)} type="password" placeholder="Secret Key" className="input input-bordered w-96" />
                </div>
                <button className="btn w-full btn-info mt-3" onClick={handleTokenSubmit} disabled={loading}>
                    Verify
                </button>
            </div>
        </div>
    )
}

export default SigninVerify