import { useAuth } from "../context/AuthContext";
import { timeSinceConsumption, getCaffeineAmount, calculateCurrentCaffeineLevel } from "../utils";

export default function Histroy() {
    const { globalData } = useAuth()
    const sortedTimeStamps = Object.keys(globalData).sort((a, b) => { return b - a })
    console.log(sortedTimeStamps)
    return (

        <div className="form p-4 shadow-inner dark:shadow-zinc-900">
            <div className="flex justify-start items-center gap-2 text-orange-800 dark:text-orange-600 font-semibold text-lg sm:text-2xl mb-4 mt-6">
                <i className="fa-solid fa-timeline"></i>
                <h3 className="capitalize">Histroy</h3>
            </div>
            <p><i>Hover for more information !</i></p>
            <div className="flex items-center gap-2 flex-wrap mt-1 mb-10">
                {
                    sortedTimeStamps.map((utcTime, index) => {
                        const coffee = globalData[utcTime]
                        const timeSinceConsume = timeSinceConsumption(utcTime)
                        const originalAmount = getCaffeineAmount(coffee.name)
                        const remainingAmount = calculateCurrentCaffeineLevel({ [utcTime]: coffee })
                        const summary = `${coffee.name} | ${timeSinceConsume} | $${coffee.cost} | ${remainingAmount}mg / ${originalAmount}mg`

                        return (
                            <div title={summary} key={index} className="text-2xl sm:text-3xl md:text-4xl text-orange-950 dark:text-orange-300">
                                <i className="fa-solid fa-mug-hot" />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}