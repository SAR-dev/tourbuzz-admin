import { useState } from 'react';

enum SigninState {
    MAIL, TOKEN
}

const Signin = () => {
    const [state, setState] = useState<SigninState>(SigninState.MAIL)

    const [email, setEmail] = useState("")
    const [token, setToken] = useState("")

    const handleEmailSubmit = () => {

    }

    const handleTokenSubmit = () => {
        
    }

    return (
        <div className='bg-base-100 flex h-screen w-full justify-center items-center'>
            <div className="card p-5 bg-base-200 grid grid-cols-1 gap-3">
                <div className="text-center font-semibold text-lg">Sign In</div>
                {state === SigninState.MAIL && (
                    <>
                        <div>
                            <label className="label">Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" className="input input-bordered w-64" />
                        </div>
                        <button className="btn w-full btn-primary" onClick={handleEmailSubmit}>
                            Send Verification Link
                        </button>
                    </>
                )}
                {state === SigninState.TOKEN && (
                    <>
                        <div>
                            <label className="label">Token</label>
                            <input value={token} onChange={e => setToken(e.target.value)} type="text" placeholder="Token" className="input input-bordered w-64" />
                        </div>
                        <button className="btn w-full btn-primary" onClick={handleTokenSubmit}>
                            Verify Token
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Signin