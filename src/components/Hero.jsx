export default function Hero() {
    return (
        <div className="hero p-4 my-4">
            <h1 className="text-lg sm:text-2xl font-semibold text-orange-800 dark:text-orange-600 my-2">Coffe Tracking for Coffee <abbr title="An enthusiast or devotee">Fiends</abbr>!</h1>
            <div className="benefits-list m-2">
                <h3 className="text-md sm:text-xl text-slate-800 dark:text-slate-200">Try <span className="text-gradient font-bold">Caffidose</span> and start ...</h3>
                <p>✅ Tracking every coffee</p>
                <p>✅ Estimating your blood caffeine levels</p>
                <p>✅ Costing and quantifying your addition</p>
            </div>
            <div className="p-4 bg-orange-200 dark:bg-amber-900 rounded-lg my-6 max-w-2xl">
                <div className="flex justify-start items-center gap-2 text-lg sm:text-2xl text-yellow-700 dark:text-yellow-100 font-semibold my-3">
                    <i className="fa-solid fa-circle-info"></i>
                    <h3>Did you Know ...</h3>
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-300 text-base sm:text-xl m-2">That caffeine&apos;s halflife is about 5 hours?</h4>
                <p className="mx-2 leading-5">This means that after 5 hours, half the caffeine you consumed is still in your system, keeping you alert longer so if you drink a cup of coffee with a 200 mg of caffeine, 5 hours later, you will still have about 100 mg of  caffeine in your system.</p>
            </div>
        </div>
    )
}
