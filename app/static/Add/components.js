function InputID(label = "Name", model = "Membership") {
    let [state, setstate] = React.useState(null)
    let [isActive, setisActive] = React.useState(false)
    let [search, setsearch] = React.useState("")
    let inputElement = React.useRef(null)
    let [DataArray, setDataArray] = React.useState([])
    React.useEffect(() => {
        let { protocol, host } = window.location
        let url = `${protocol}//${host}/api/searchname/${model}/${search || "_all"}/`
        fetch(url).then(res => res.json()).then(res => {
            setDataArray([...res])
        }).catch(console.log)
    }, [search])
    React.useEffect(() => {
        setsearch(state?.name ?? "")
    }, [state])

    return [[state,setstate],
        (<div className="w-full h-fit border-2 border-gray-500 text-black flex relative rounded-xl bg-white pt-3 hover:shadow-sm flex-col" onFocus={(e) => {
            setisActive(true)
        }} onBlur={(e) => {
            setTimeout(() => {
                setisActive(false)
            }, 300);
        }} onKeyDown={(e) => {
            if (e.key == "Escape") {
                inputElement.current.blur()
                setisActive(false)
            }
            if (e.key == "Enter") {
                setstate(DataArray[0])
                setisActive(false)
                inputElement.current.blur()
            }
        }}>
            <span className="absolute top-0 -left-0 font-bold text-md pl-3 z-10 text-gray-500">{label}</span>
            <div className="w-full h-fit relative rounded-xl overflow-hidden">
                <span className={"flex h-full absolute right-0 aspect-square items-center cursor-pointer justify-center " + (state == null ? "hidden" : "")} onClick={(e) => {
                    setstate(null)
                }}><span className="pointer-events-none text-sm">❌</span></span>
                <input disabled={state == null ? false : true} ref={inputElement} className="w-full text-md p-3 outline-none text-gray-900 bg-white " value={search} onChange={(e) => {
                    setsearch(e.currentTarget.value)
                }} />
            </div>
            <div className="w-full h-fit relative z-10">
                <div className={`w-full border-2 border-gray-500 h-48 max-h-fit hide-bar rounded-xl mt-1 overflow-scroll absolute bg-white even:bg-black ${isActive ? "" : "hidden"}`}>
                    {DataArray.map((data, i) => <span className={`flex flex-col w-full p-3 hover:bg-green-500 border-gray-300 items-center justify-center cursor-pointer ${(i == 0 && search != "") ? "bg-green-500" : ""}`} onClick={(e) => {
                        setstate(v => {
                            return ({ ...data })
                        })
                        setisActive(false)
                    }}>
                        <span>{data?.name} ({data?.id})</span>
                    </span>)}
                </div>
            </div>
        </div>)]
}
function InputChoice(label, choice) {
    let [state, setState] = React.useState("")
    return [[state,setState], (<div className="w-full shadow-sm h-fit pt-3 border-2 border-gray-500 bg-white flex flex-col relative rounded-xl">
        <span className="absolute top-0 px-3 font-bold">{label}</span>
        <select className="text-md p-3 outline-none w-full h-fit" value={state} onChange={(e)=>{
            setState(e.currentTarget.value)
        }}>
            {choice.map(v => (<option value={v.value}>{v.name}</option>))}
        </select>
    </div>)]
}
function InputValue(label, type) {
    let [state, setState] = React.useState("")
    return [[state,setState], (<div className="w-full shadow-sm h-fit pt-3 border-2 border-gray-500 bg-white flex flex-col relative rounded-xl">
        <span className="absolute top-0 px-3 font-bold">{label}</span>
        <input type={type} className="text-md p-3 outline-none" value={state} onChange={(e) => {
            setState(e.currentTarget.value)
        }} />
    </div>)]
}

let OnClear = ()=>{
    // Runs on Clear Button Clicked
}

let OnSubmit = ()=>{
    // Runs on Submit Button
}


function InputMultiLine(label, type) {
    let [state, setState] = React.useState("")
    return [[state,setState], (<div className="w-full shadow-sm border-2 border-gray-500 h-fit pt-3 bg-white flex flex-col relative rounded-xl">
        <span className="absolute top-0 px-3 font-bold">{label}</span>
        <textarea className="text-md p-3 outline-none" value={state} onChange={(e) => {
            setState(e.currentTarget.value)
        }} />
    </div>)]
}


function ModuleSelector({ model }) {
    let selectele = React.useRef(null)
    React.useEffect(() => {
        if (model) {
            selectele.current.value = model
        }
        else {
            selectele.current.value = ""
        }
    }, [])
    if (model)
        document.querySelector("title").textContent = "Add Data of " + model || "Empty"
    return <div className="h-full w-full relative">
        <span className="absolute h-12 aspect-square rounded-xl flex items-center justify-center right-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-chevron-down-icon lucide-circle-chevron-down text-gray-500">
                <circle cx="12" cy="12" r="10" />
                <path d="m16 10-4 4-4-4" />
            </svg>
        </span>
        <select ref={selectele} className="h-12 w-full p-3 outline-none rounded-xl hover:shadow-sm border-2 border-gray-500 hover:shadow-gray-500" onChange={(e) => {
            window.open("/add?model=" + e.currentTarget.value, "_self")
        }}>
            <option value="" selected>---Select---</option>
            <option value="Member">Member</option>
            <option value="Membership">Member Ship</option>
            <option value="Purchase">Purchase</option>
            <option value="Payment">Payment</option>
            <option value="Fitness">Fitness</option>
        </select>
    </div>
}