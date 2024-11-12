import ReactDom from "react-dom"
export default function Modal(props) {
    const { children, handleCloseModal } = props
    return (
        ReactDom.createPortal(
            <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
                <button className="absolute top-0 left-0 w-full h-full bg-neutral-800/70 -z-10" onClick={handleCloseModal}>
                </button>
                <div className="p-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 z-10 shadow-lg">
                    {children}
                </div>
            </div>
            , document.getElementById('portal'))
    )
}
