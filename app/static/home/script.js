let root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)

function App() {
    return <div className="w-full h-full p-3">
        <h1>Add Member</h1>
        <FormView />
    </div>
}

function FormView() {
    return <form method="post">
        <input className="h-full border-2 text-xl p-3 rounded-xl"></input>
    </form>
}