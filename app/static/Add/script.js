// import React from "react"

let maininnerbody = ReactDOM.createRoot(document.getElementById("maininnerbody"))
maininnerbody.render(<App />)

function App() {
    let [keys, setkey] = React.useState({})
    let urlquery = new URLSearchParams(window.location.search)
    let model = urlquery.get("model")
    // alert(model)
    return <div className="w-full h-full p-3 grid grid-cols-3 gap-3 text-gray-500">
        <div className="w-full h-full p-3 gap-3 flex flex-col col-span-1 rounded-xl">
            <h1 className="w-full h-fit text-xl font-bold">Model</h1>
            <ModuleSelector model={model} />
        </div>
        <div className="col-span-2 shadow-sm hover:shadow-md rounded-xl border-2 border-gray-100 flex flex-col">
            <div className="w-full flex flex-row-reverse border-b-2 border-gray-500 p-1 items-center">
                <button className="h-fit bg-green-500 rounded-xl shadow-sm p-1 mx-3 px-6 font-bold active:bg-gray-300 text-white" onClick={(e) => {
                    OnSubmit()
                }}>Submit</button>
                <button className="h-fit bg-violet-500 rounded-xl shadow-sm p-1 mx-3 px-6 font-bold active:bg-gray-300 text-white" onClick={(e) => {
                    OnClear()
                }}>Clear</button>
                <span className="w-full max-h-fit flex-1 px-3 text-nowrap inline-block overflow-ellipsis py-3 text-xl font-bold">
                    {model ? "Add " + model.toUpperCase() : "Select Module"}
                </span>
            </div>
            <div className="flex-1">
                {
                    (() => {
                        switch (model) {
                            case "Member":
                                return <MemberComponent />
                                break
                            case "Membership":
                                return <MembershipComponent />
                                break
                            case "Purchase":
                                return <PurchaseComponent />
                            case "Fitness":
                                return <FitnessComponent/>
                            default:
                                return <div>No Module Selected</div>
                        }
                    })()
                }
            </div>
        </div>
    </div>
}

function MemberComponent() {
    let [[name, setname], nameelement] = InputValue("Joinee Name", "text")
    let [[contactno, setcontactno], contactnoelement] = InputValue("Contact No", "text")
    let [[email, setemail], emailelement] = InputValue("Email", "text")
    let [[address, setaddress], addresselement] = InputMultiLine("Address", "text")
    let [[area, setarea], areaelement] = InputValue("Area", "text")
    // let [[joineddate, setjoineddate], joineddateelement] = InputValue("Joined Date", "date")
    let form = new FormData()
    form.append("name", name)
    form.append("contactno", contactno)
    form.append("email", email)
    form.append("address", address)
    form.append("area", area)
    let { origin, pathname } = window.location
    let url = (origin + "/api/create/Member/")
    OnSubmit = () => {
        fetch(url, { method: "POST", body: form }).then(res => res.json()).then(alert).catch(console.log)
        OnClear()
    }
    OnClear = () => {
        setname("")
        setcontactno("")
        setemail("")
        setaddress("")
        setarea("")
    }
    return <div className="w-full h-fit grid grid-cols-2 gap-3 p-3">
        {
            [nameelement, contactnoelement, emailelement, addresselement, areaelement]
        }
    </div>
}

function MembershipComponent() {
    let periodinmonthchoice = [{ name: "1 Month", value: 1 }, { name: "3 Month", value: 3 }, { name: "6 Month", value: 6 }, { name: "9 Month", value: 9 }, { name: "1 Year", value: 12 }]
    let [[name, setname], nameelement] = InputValue("Joinee Name", "text")
    let [[periodinmonth, setperiodinmonth], periodinmonthelement] = InputChoice("Duration", periodinmonthchoice)
    let [[amountininr, setamountininr], amountininrelement] = InputValue("Amount In Inr", "number")
    let form = new FormData()
    form.append("name", name)
    form.append("periodinmonth", periodinmonth)
    form.append("amountininr", amountininr)
    let { origin, pathname } = window.location
    let url = (origin + "/api/create/Membership/")
    OnSubmit = () => {
        fetch(url, { method: "POST", body: form }).then(res => res.json()).then(alert).catch(console.log)
        OnClear()
    }
    OnClear = () => {
        setname("")
        setperiodinmonth("")
        setamountininr("")
    }
    return <div className="w-full h-fit grid grid-cols-2 gap-3 p-3">
        {
            [nameelement, periodinmonthelement, amountininrelement]
        }
    </div>
}

function PurchaseComponent() {
    let [[memberid, setmemberid], memberidelement] = InputID("Member", "Member")
    let [[membershipid, setmembershipid], membershipidelement] = InputID("Membership", "Membership")
    let [[amount, setamount], amountelement] = InputValue("Amount In Inr", "number")
    let form = new FormData()
    form.append("memberid", memberid?.id)
    form.append("membershipid", membershipid?.id)
    form.append("amount", amount)
    let { origin, pathname } = window.location
    let url = (origin + "/api/create/Purchase/")
    OnSubmit = () => {
        fetch(url, { method: "POST", body: form }).then(res => res.json()).then(alert).catch(console.log)
        OnClear()
    }
    OnClear = () => {
        setmemberid("")
        setmembershipid("")
        setamount("")
    }
    return <div className="w-full h-fit grid grid-cols-2 gap-3 p-3">
        {
            [memberidelement, membershipidelement, amountelement]
        }
    </div>
}

function FitnessComponent() {
    ["memberid","height","weight","bmi","date"]
    let [[memberid, setmemberid], memberidelement] = InputID("Member", "Member")
    let [[height, setheight], heightelement] = InputValue("Height", "number")
    let [[weight, setweight], weightelement] = InputValue("Weight", "number")
    let [[bmi,setbmi],bmielement] = InputValue("BMI","number")

    let form = new FormData()
    form.append("memberid", memberid?.id)
    form.append("height", height)
    form.append("weight", weight)
    form.append("bmi", bmi)
    let { origin, pathname } = window.location
    let url = (origin + "/api/create/Fitness/")
    OnSubmit = () => {
        fetch(url, { method: "POST", body: form }).then(res => res.json()).then(alert).catch(console.log)
        OnClear()
    }
    OnClear = () => {
        setmemberid("")
        setheight("")
        setweight("")
        setbmi("")
    }
    return <div className="w-full h-fit grid grid-cols-2 gap-3 p-3">
        {
            [memberidelement, heightelement, weightelement,bmielement]
        }
    </div>
}