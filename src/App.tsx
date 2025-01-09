import './App.css'
import TableContainer from "./components/TableContainer.tsx";

function App() {

    return (
        <>
            <div className="flex flex-col w-full bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen px-2">
                <div className="flex justify-center items-center">
                    <h1 className="text-4xl font-bold py-4">Rick and Morty Characters</h1>
                </div>
                <TableContainer/>
            </div>
        </>
    )
}

export default App
