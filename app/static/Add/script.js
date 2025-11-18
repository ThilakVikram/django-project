// import React from "react"

let maininnerbody = ReactDOM.createRoot(document.getElementById("maininnerbody"))
maininnerbody.render(<App />)

function App() {
    let [keys, setkey] = React.useState({})
    let [isfetched, setisfetched] = React.useState(true)
    let urlquery = new URLSearchParams(window.location.search)
    let model = urlquery.get("model")
    React.useEffect(() => {
        if (model)
            fetch(`http://localhost:8000/api/fields/${model}`).then(res => res.json()).then(v => {
                console.log(v)
                setisfetched(r => !r)
                setkey(r => ({ ...v }))
            })
    }, [])
    return <div className="w-full h-full p-3 grid grid-cols-3 gap-3 text-gray-500">
        <div className="w-full h-full p-3 gap-3 flex flex-col col-span-1 rounded-xl">
            <h1 className="w-full h-fit text-xl font-bold">Model</h1>
            <ModuleSelector model={model} />
        </div>
        <div className="col-span-2 shadow-sm hover:shadow-md rounded-xl border-2 border-gray-100 flex flex-col">
            <div className="w-full flex flex-row-reverse border-b-2 border-gray-500 p-1 items-center">
                <button className="h-fit bg-green-500 rounded-xl shadow-sm p-1 mx-3 px-6 font-bold active:bg-gray-300 text-white">Submit</button>
                <button className="h-fit bg-violet-500 rounded-xl shadow-sm p-1 mx-3 px-6 font-bold active:bg-gray-300 text-white">Clear</button>
                <span className="w-full max-h-fit flex-1 px-3 text-nowrap inline-block overflow-ellipsis py-3 text-xl font-bold">
                    {model ? "Add " + model.toUpperCase() : "Select Module"}
                </span>
            </div>
            <div className="flex-1">
                {/* <div className="grid w-full h-fit grid-cols-3 gap-3 p-3 items-start">
                    {Object.entries(keys).map(([label,type])=>{return <SingleLineInput label={label} ktype={type} />})}
                </div> */}
                <FormBuilder structure={keys} model={model} />
            </div>
        </div>
    </div>
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

/**
 * 
 * @param {string} type - "multiline","singleline","currency","date",default="text" 
 * @returns JSX Element
 */
function SingleLineInput({ obj, key, label }) {
    let inputtype = null
    switch (ktype) {
        case "multiline":
            inputtype = "multiline"
            break
        case "singleline":
            inputtype = "text"
            break
        case "currency":
            inputtype = "number"
            break
        case "email":
            inputtype = "email"
            break
        case "int":
            inputtype = "number"
            break
        case "date":
            inputtype = "date"
            break
        default:
            inputtype = "text"
            break
    }
    return <div className="w-full h-fit relative p-1 pt-5 font-bold">
        <span className="text-md absolute top-0 left-2 p-1 rounded-xl bg-white">{label}</span>
        {inputtype == "multiline" ?
            <textarea className="min-h-24 h-24 max-h-24 p-3 w-full text-xl font-semibold border border-gray-500 rounded-xl outline-none"></textarea>
            : <input type={inputtype} className="p-3 w-full text-xl font-semibold border border-gray-500 rounded-xl outline-none"></input>}
    </div>
}

function SingleLine({ obj = {}, key = "", label = "", type = "" }) {
    return <div className="w-full h-fit relative p-1 pt-5 font-bold">
        <span className="text-md absolute top-0 left-2 p-1 rounded-xl bg-white">{label}</span>
        <input type={type} className="p-3 w-full text-xl font-semibold border border-gray-500 rounded-xl outline-none" onChange={(e) => {
            obj[key] = e.currentTarget.textContent
        }}></input>
    </div>
}

function Multiline({ obj = {}, key = "", label = "" }) {
    return <div className="w-full h-fit relative p-1 pt-5 font-bold">
        <span className="text-md absolute top-0 left-2 p-1 rounded-xl bg-white">{label}</span>
        <textarea className="min-h-24 h-24 max-h-24 p-3 w-full text-xl font-semibold border border-gray-500 rounded-xl outline-none" onChange={(e) => {
            obj[key] = e.currentTarget.textContent
        }}></textarea>
    </div>
}

function FormBuilder({ structure = {}, model = "" }) {
    let UpdateData = Object.fromEntries(Object.entries(structure).map(([k, o]) => {
        return [k, ""]
    }))
    let [value, Ele] = SearchNameFromModel()
    return <div className="w-full h-full bg-violet-500 p-3">
        <div className="w-96 h-fit">
            {Ele}
        </div>
        {/* <div className="h-24 w-full bg-white"></div> */}
    </div>
}


function SearchNameFromModel(label = "Name",model = "") {
    let [state, setstate] = React.useState(null)
    let [isActive, setisActive] = React.useState(false)
    let [search, setsearch] = React.useState("")
    let inputElement = React.useRef(null)
    let [DataArray,setDataArray] = React.useState([])
    React.useEffect(()=>{
        let {protocol,host} = window.location
        let url = `${protocol}//${host}/api/searchname/Member/${search || "a"}/`
        fetch(url).then(res=>res.json()).then(res=>{
            setDataArray([...res])
        }).catch(console.log)
    },[search])
    React.useEffect(() => {
        setsearch(state?.name ?? "")
    }, [state])

    return [state,
        (<div className="w-full h-fit text-black flex relative rounded-xl bg-white pt-3 hover:shadow-sm flex-col" onFocus={(e) => {
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
            <span className="absolute top-0 -left-0 font-bold text-md pl-3 z-10 text-gray-500">Name</span>
            <div className="w-full h-fit relative rounded-xl overflow-hidden">
                <span className={"flex h-full absolute right-0 aspect-square items-center cursor-pointer justify-center " + (state == null ? "hidden" : "")} onClick={(e) => {
                    setstate(null)
                }}><span className="pointer-events-none text-sm">❌</span></span>
                <input disabled={state == null ? false : true} ref={inputElement} className="w-full text-md p-3 outline-none text-gray-900 bg-white " value={search} onChange={(e) => {
                    setsearch(e.currentTarget.value)
                }} />
            </div>
            <div className="w-full h-fit relative rounded-xl">
                <div className={`w-full h-fit rounded-xl mt-1 overflow-hidden absolute bg-white even:bg-black ${isActive ? "" : "hidden"}`}>
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