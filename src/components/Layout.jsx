import { useAuth } from "../context/AuthContext"

export default function Layout(props) {
    const { children, handleOpenModal } = props
    const { logout, globalUser } = useAuth()
    const header = (
        <header className="p-5 flex justify-between items-center bg-gray-300 dark:bg-zinc-900 mb-4 shadow-md">
            <div>
                <h1 className="text-gradient uppercase font-bold text-3xl sm:text-4xl">caffidose</h1>
                <p className="text-sm text-cinnamon-100 font-semibold ms-1">For Coffee Insatiates</p>
            </div>
            <button className="btn flex items-center gap-2 bg-yellow-600 dark:bg-yellow-400 text-neutral-200 dark:text-neutral-700 border-4 border-orange-900" onClick={globalUser ? logout : handleOpenModal}>
                {globalUser ?
                    <p className="capitalize text-neutral-200 dark:text-neutral-700 font-semibold">logout</p>
                    :
                    <>
                        <p className="capitalize text-neutral-200 dark:text-neutral-700 font-semibold">sign up Free</p>
                        <i className="fa-solid fa-mug-hot"></i>
                    </>}
            </button>
        </header>
    )
    const footer = (
        <footer className="text-center bg-gray-300 dark:bg-zinc-900 py-1 shadow-md">
            <p><a href="/" className="text-orange-400 dark:text-orange-300">Caffidose&copy;</a> created by <a href="https://github.com/AbdallahAbozeid" target="_blank">Abdallah</a> @<span>{new Date().getFullYear()}</span></p>
        </footer>
    )
    return (
        <>
            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}
