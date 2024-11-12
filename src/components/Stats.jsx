import { useAuth } from "../context/AuthContext"
import { calculateCoffeeStats, calculateCurrentCaffeineLevel, getTopThreeCoffees, statusLevels } from "../utils"

export default function Stats() {

    function StatCard(props) {
        const { lg, title, children } = props
        return (
            <div className={'bg-zinc-300 dark:bg-zinc-700 p-4 rounded-lg shadow-sm' + (lg ? ' sm:col-span-2' : '')}>
                <h4 className="font-bold text-neutral-700 dark:text-neutral-300 text-base sm:text-lg mb-2">{title}</h4>
                {children}
            </div>
        )
    }
    const { globalData } = useAuth()
    const stats = calculateCoffeeStats(globalData)
    const caffeineLevel = calculateCurrentCaffeineLevel(globalData)
    const warningLevel = caffeineLevel < statusLevels['low'].maxLevel ?
        'low' : caffeineLevel < statusLevels['moderate'].maxLevel ?
            'moderate' :
            "high"
    return (
        <div className="form p-4 shadow-inner dark:shadow-zinc-900">
            <div className="section-header flex justify-start items-center gap-2 text-orange-800 dark:text-orange-600 font-semibold text-lg sm:text-2xl mb-4 mt-6">
                <i className="fa-solid fa-chart-simple"></i>
                <h3 className="capitalize">Stats</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard lg title="Active Caffeine Level">
                    <div className="flex items-center gap-4">
                        <p><span className="text-3xl sm:text-4xl">{caffeineLevel}</span>mg</p>
                        <h5 style={{ color: statusLevels[warningLevel].color, background: statusLevels[warningLevel].background }} className="px-2 py-1 rounded-md capitalize">{warningLevel}</h5>
                    </div>
                    <p>{statusLevels[warningLevel].description}</p>
                </StatCard>
                <StatCard title="Daily Caffeine">
                    <p><span className="text-3xl sm:text-4xl">{stats.daily_caffeine}</span> mg</p>
                </StatCard>
                <StatCard title="Avg # of Coffees">
                    <p><span className="text-3xl sm:text-4xl">{stats.average_coffees}</span></p>
                </StatCard>
                <StatCard title="Daily Cost ($)">
                    <p>$ <span className="text-3xl sm:text-4xl">{stats.daily_cost}</span></p>
                </StatCard>
                <StatCard title="Total Cost ($)">
                    <p>$ <span className="text-3xl sm:text-4xl">{stats.total_cost}</span></p>
                </StatCard>
                <table className="sm:col-span-2 border-separate border-spacing-1 table-auto rounded-md  bg-zinc-200 dark:bg-zinc-800 mb-10">
                    <thead className="bg-zinc-400 dark:bg-zinc-600 text-neutral-800 dark:text-neutral-200 ">
                        <tr>
                            <th className="py-2">Coffee Name</th>
                            <th>Number of Purchase</th>
                            <th>Percentage of Total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-zinc-300 dark:bg-zinc-700 text-neutral-600 dark:text-neutral-400">
                        {getTopThreeCoffees(globalData).map((coffee, coffeeIndex) => {
                            return (
                                <tr key={coffeeIndex}>
                                    <td className="py-1 ps-4">{coffee.coffeeName}</td>
                                    <td className="py-1 ps-4">{coffee.count}</td>
                                    <td className="py-1 ps-4">{coffee.percentage}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}