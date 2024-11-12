import { useState } from 'react'
import { coffeeOptions } from '../utils'
import { useAuth } from '../context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'
export default function CoffeeForm(props) {
    const { isAuthenticated, handleOpenModal } = props
    const sortedByName = [...coffeeOptions.slice(5)].sort((a, b) => a.name.localeCompare(b.name))
    const [showOptions, setShowOptions] = useState(false)
    const [selectedCoffee, setSelectedCoffee] = useState("")
    const [coffeeCost, setCoffeeCost] = useState("")
    const [hours, setHours] = useState(0)
    const [mins, setMins] = useState(0)
    const { globalData, setGlobalData, globalUser } = useAuth()

    async function handleSubmition() {
        if (!isAuthenticated) {
            handleOpenModal();
            return
        }
        //define a gaurd clause thats only submits the data if its only completed
        if (!selectedCoffee) { return }
        try {
            //the we're going to create new data object with the new entry added
            const newGlobalData = { ...globalData || {} }
            const timeNow = Date.now()
            const timeToSubtract = hours * 60 * 60 * 1000 + mins * 60 * 1000
            const timeStamp = timeNow - timeToSubtract
            const newEntry = { name: selectedCoffee, cost: coffeeCost }
            newGlobalData[timeStamp] = newEntry
            //update the global state
            setGlobalData(newGlobalData)
            //persist the data in the firebase
            const docRef = doc(db, 'users', globalUser.uid)
            await setDoc(docRef, { [timeStamp]: newEntry }, { merge: true })
            setSelectedCoffee(null)
            setCoffeeCost(0)
            setHours(0)
            setMins(0)
        }
        catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="form p-4 shadow-inner dark:shadow-zinc-900">
            <div className="section-header flex justify-start items-center gap-2 text-orange-800 dark:text-orange-600 font-semibold text-lg sm:text-2xl mb-4 mt-6">
                <i className="fa-solid fa-pencil"></i>
                <h3 className="capitalize">Start tracking today </h3>
            </div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-300 text-base sm:text-xl capitalize mb-2">select your coffee:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 m-3">
                {coffeeOptions.slice(0, 5).map((opt, i) => {
                    return (
                        <button key={i} className={'btn border-4 border-orange-900 bg-zinc-200 dark:bg-zinc-800 ' + ((selectedCoffee == opt.name) ? ' selected' : '')} onClick={() => {
                            setSelectedCoffee(opt.name)
                            setShowOptions(false)
                        }}>
                            <p className='text-neutral-700 dark:text-neutral-300'>{opt.name}</p>
                            <p className='text-neutral-700 dark:text-neutral-300'>{opt.caffeine}mg</p>
                        </button>
                    )
                })}
                <button className={'btn border-4 border-orange-900 bg-zinc-200 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300' + (showOptions ? " selected" : '')} onClick={() => {
                    setShowOptions(true)
                    setSelectedCoffee(null)
                }}>
                    <p className='text-neutral-700 dark:text-neutral-300'>Other</p>
                    <p className='text-neutral-700 dark:text-neutral-300'>n/a</p>
                </button>
            </div>
            {showOptions &&
                <select name="coffee-list" id="coffee-list" className='w-[280px] p-4 ms-3 mb-4 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300' onChange={(e) => { setSelectedCoffee(e.target.value) }}>
                    <option value={null}>Select type</option>
                    {
                        sortedByName.map((opt, i) => {
                            return (
                                <option key={i} value={opt.name} onClick={() => { setSelectedCoffee(opt.name) }}>{opt.name} {opt.caffeine}mg</option>)
                        })}
                </select>}
            <h4 className="font-semibold text-slate-800 dark:text-slate-300 text-base sm:text-xl capitalize mb-2">add the cost ($)</h4>
            <input type='number' placeholder='5.21' value={coffeeCost} onChange={(e) => { setCoffeeCost(e.target.value) }} className='w-[120px] py-3 text-center ms-3 mb-4 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300 outline-none' />
            <h4 className="font-semibold text-slate-800 dark:text-slate-300 text-base sm:text-xl capitalize mb-2">time since consumption</h4>
            <div className='time flex justify-start items-center gap-6'>
                <div className='hours'>
                    <h5 className='text-base text-neutral-600 dark:text-neutral-300 ms-3 capitalize'>hours</h5>
                    <select id="hours" onChange={(e) => { setHours(e.target.value) }} value={hours} className='w-[120px] py-3 text-center ms-3 mb-4 rounded-lg  bg-zinc-200 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300 outline-none'>
                        {
                            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((hour, index) => {
                                return (
                                    <option key={index} value={hour}>{hour}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='mins'>
                    <h5 className='text-base text-neutral-600 dark:text-neutral-300 ms-3 capitalize'>mins</h5>
                    <select id="mins" value={mins} onChange={(e) => { setMins(e.target.value) }} className='w-[120px] py-3 text-center ms-3 mb-4 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300 outline-none'>
                        {
                            [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((min, index) => {
                                return (
                                    <option key={index} value={min}>{min}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            <button className='btn bg-yellow-600 dark:bg-yellow-400 border-4 border-orange-900 ms-3 my-2' onClick={handleSubmition}>
                <p className='text-neutral-200 dark:text-neutral-700 text-sm sm:text-base md:text-xl'> Add Entery</p>
            </button>
        </div>
    )
}
