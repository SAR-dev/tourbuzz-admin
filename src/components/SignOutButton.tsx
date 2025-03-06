import { useAuthStore } from '@src/store';
import { useNavigate } from 'react-router-dom';
import { Logout } from 'tabler-icons-react';

function SignOutButton({ expanded }: { expanded: boolean }): JSX.Element {
    const {clearToken} = useAuthStore()
    const navigate = useNavigate()

    const signOut = () => {
        clearToken()
        localStorage.clear()
        navigate("/")
    }
    return (
        <div className='flex h-fill items-end'>
            <button
                className="btn btn-sm h-10 bg-transparent border-transparent shadow-none w-full flex justify-start"
                onClick={signOut}
                data-tooltip-id={!expanded ? "nav-tooltip" : ""}
                data-tooltip-content={!expanded ? "Sign Out" : ""}
            >
                <Logout className='h-5 w-5' />
                {expanded && (
                    <>
                        Sign Out
                    </>
                )}
            </button>
        </div>
    );
}

export default SignOutButton;
