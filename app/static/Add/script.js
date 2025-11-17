// import React from "react"

let maininnerbody = ReactDOM.createRoot(document.getElementById("maininnerbody"))
maininnerbody.render(<App />)

function App() {
    let [keys, setkey] = React.useState({})
    let [isfetched, setisfetched] = React.useState(true)
    let urlquery = new URLSearchParams(window.location.search)
    let module = urlquery.get("module")
    React.useEffect(() => {
        if (module)
            fetch(`http://localhost:8000/api/fields/${module}`).then(res => res.json()).then(v => {
                console.log(v)
                setisfetched(r => !r)
                setkey(r => ({ ...v }))
            })
    }, [])
    return <div className="w-full h-full p-3 grid grid-cols-3 gap-3 text-gray-500">
        <div className="w-full h-full p-3 gap-3 flex flex-col col-span-1 rounded-xl">
            <h1 className="w-full h-fit text-xl font-bold">Module</h1>
            <ModuleSelector module={module} />
        </div>
        <div className="col-span-2 shadow-sm hover:shadow-md rounded-xl border-2 border-gray-100 flex flex-col">
            <div className="w-full flex flex-row-reverse border-b-2 border-gray-500 p-1 items-center">
                <button className="h-fit bg-green-500 rounded-xl shadow-sm p-1 mx-3 px-6 font-bold active:bg-gray-300 text-white">Submit</button>
                <button className="h-fit bg-violet-500 rounded-xl shadow-sm p-1 mx-3 px-6 font-bold active:bg-gray-300 text-white">Clear</button>
                <span className="w-full max-h-fit flex-1 px-3 text-nowrap inline-block overflow-ellipsis py-3 text-xl font-bold">
                    {module ? "Add " + module.toUpperCase() : "Select Module"}
                </span>
            </div>
            <div className="flex-1">
                {/* <div className="grid w-full h-fit grid-cols-3 gap-3 p-3 items-start">
                    {Object.entries(keys).map(([label,type])=>{return <SingleLineInput label={label} ktype={type} />})}
                </div> */}
                <FormBuilder structure={keys}>

                </FormBuilder>
            </div>
        </div>
    </div>
}

function ModuleSelector({ module }) {
    let selectele = React.useRef(null)
    React.useEffect(() => {
        if (module) {
            selectele.current.value = module
        }
        else {
            selectele.current.value = ""
        }
    }, [])
    if (module)
        document.querySelector("title").textContent = "Add Data of " + module || "Empty"
    return <div className="h-full w-full relative">
        <span className="absolute h-12 aspect-square rounded-xl flex items-center justify-center right-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-chevron-down-icon lucide-circle-chevron-down text-gray-500">
                <circle cx="12" cy="12" r="10" />
                <path d="m16 10-4 4-4-4" />
            </svg>
        </span>
        <select ref={selectele} className="h-12 w-full p-3 outline-none rounded-xl hover:shadow-sm border-2 border-gray-500 hover:shadow-gray-500" onChange={(e) => {
            window.open("/add?module=" + e.currentTarget.value, "_self")
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

function ItemFounder({ obj = {}, key = "", label = "", model = "" }) {
    let [search, setsearch] = React.useState("")
    let [isOpen, setisOpen] = React.useState(false)
    let [isSelected, setisSelected] = React.useState(false)
    let [searchsuggestion, setsearchsuggestion] = React.useState([])
    React.useEffect(() => {
        let tempsearch = ""
        if (search == "")
            tempsearch = "a"
        else
            tempsearch = search
        console.log("search", search)
        let ss = fetch(`http://localhost:8000/api/searchname/Member/${tempsearch}/`).then(res => res.json()).then(res => {
            console.log(res)
            setsearchsuggestion(res)
        });
    }, [search])
    // let Suggestion = productsname;
    return <div className="w-full h-full border-2">
        <div className="w-96 max-h-96 h-fit bg-violet-500 flex flex-col">
            <div className="h-fit relative">
                <span className={"absolute right-0 top-0 h-full aspect-square flex items-center justify-center "+(isSelected ? "" : "hidden")} onClick={(e)=>{
                    setisSelected(false)
                    setsearch("")
                }}>❌</span>
                <input disabled={isSelected} className="w-96 h-fit text-xl p-3 border outline-none" onFocus={(e) => {
                    console.log("is open thilak vikram R")
                    setisOpen(true)
                    console.log(window.getSelection())
                }} value={search} onChange={(e) => {
                    console.log("onchange", e.currentTarget.value)
                    setsearch(e.currentTarget.value)
                }} />
            </div>
            <div className={"flex-1 overflow-auto grid grid-cols-1 shadow-xl rounded-b-xl " + (isOpen ? "" : "hidden")}>
                {searchsuggestion && searchsuggestion.map(({ id, name }) => <div className="w-full p-3 bg-violet-500 text-center border text-white cursor-pointer" onClick={(e) => {
                    setsearch(name)
                    setisOpen(false)
                    setisSelected(true)
                }}>{name}</div>)}
            </div>
        </div>
    </div>
}

function FormBuilder({ structure = {} }) {
    let UpdateData = Object.fromEntries(Object.entries(structure).map(([k, o]) => {
        return [k, ""]
    }))
    return <div className="w-full h-full bg-violet-500">
        <ItemFounder />
    </div>
}