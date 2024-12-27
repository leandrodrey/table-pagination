import './App.css'
import TableContainer from "./components/TableContainer.tsx";
import Loader from "./components/Loader.tsx";

function App() {

    return (
        <>
            <div className="flex justify-center items-center h-screen w-full">
                <TableContainer/>
                <Loader/>
            </div>
        </>
    )
}

export default App
