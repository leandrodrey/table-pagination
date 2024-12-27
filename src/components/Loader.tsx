import {FC} from "react";

const Loader: FC = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-300"></div>
        </div>
    );
};

export default Loader;
