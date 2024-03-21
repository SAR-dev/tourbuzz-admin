import { sendMagicLink } from '@src/functions/api';
import { useAuthStore } from '@src/store';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signin = () => {
    const { isLoggedIn } = useAuthStore();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const [email, setEmail] = useState("")

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
                toast.success("Check inbox for magic link 💪")
                setLoading(false)
                navigate("/sign-in")
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
                    <label className="label">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" className="input input-bordered w-96" />
                </div>
                <button className="btn w-full btn-info mt-3" onClick={handleEmailSubmit} disabled={loading}>
                    Send Verification Link
                </button>
                <button className="link link-hover mt-3" onClick={() => navigate("/sign-in")}>Already have a token ?</button>
            </div>
        </div>
    )
}

export default Signin