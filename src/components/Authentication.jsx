import { useState } from "react"
import { useAuth } from "../context/AuthContext"
export default function Authentication(props) {
    const { handleCloseModal } = props
    const [isRegistration, setIsRegistration] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [error, setError] = useState('')
    const { signup, login } = useAuth()
    async function handleSubmit() {
        if (!email || !email.includes('@') || !password || password.length < 6 || isAuthenticating) { return }
        try {
            setIsAuthenticating(true)
            setError('')
            if (isRegistration) {
                //register a user
                await signup(email, password)
            }
            else {
                //sign in a user
                await login(email, password)
            }
            handleCloseModal()
        } catch (err) {
            setError(err.message)
        }
        finally {
            setIsAuthenticating(false)
        }
    }
    return (
        <>
            <h2 className="capitalize text-orange-800 dark:text-orange-600 font-semibold text-lg sm:text-2xl mb-8">
                {isRegistration ? 'sign up' : 'log in'}
            </h2>
            <p className="mb-2">
                {isRegistration ? 'Create a new account!' : 'Sign in to your account!'}
            </p>
            <input placeholder="Email" type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} className="block w-full mb-2 ps-1 rounded-sm bg-zinc-100 dark:bg-zinc-700 text-neutral-700 dark:text-neutral-300 outline-none" />
            <input placeholder="Password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="block w-full mb-2 ps-1 rounded-sm bg-zinc-100 dark:bg-zinc-700 text-neutral-700 dark:text-neutral-300 outline-none" />
            {error &&
                <p className="text-rose-500 dark:text-rose-700">
                    {'Invalid email or password...'}
                </p>}
            <button onClick={handleSubmit} className="btn block mx-auto mt-4 mb-6">
                <p className="font-semibold text-base sm:text-xl">{isAuthenticating ? 'Authenticating ...' : 'Submit'}</p></button>
            <div className="register-content border-t border-orange-800 dark:border-orange-600 pt-2 my-2">
                <p>
                    {isRegistration ? 'Already have an account?  ' : 'Don\'t have an account?  '}
                    <button onClick={() => { setIsRegistration(!isRegistration) }}
                        className="hover:text-orange-800 dark:hover:text-orange-600">
                        {isRegistration ? 'Log In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </>
    )
}
