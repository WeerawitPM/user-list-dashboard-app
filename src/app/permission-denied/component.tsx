import { FaLock } from "react-icons/fa";

const PermissionDenied = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 dark:bg-black">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-red-100 p-6 rounded-full mb-8">
                        <FaLock className="h-16 w-16 text-red-500" />
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-2 dark:text-white">
                        Permission Denied
                    </h1>

                    <p className="text-lg text-gray-600 mb-8 dark:text-gray-100">
                        Sorry, you do not have permission to access this page.
                    </p>

                    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8 mb-8 dark:bg-gray-900">
                        <p className="text-gray-700 mb-4 dark:text-gray-400">
                            This area is restricted. Please contact your administrator if you believe this is an error.
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                            <FaLock className="h-4 w-4" />
                            <span>Error Code: 403</span>
                        </div>
                    </div>

                    {/* <button
                        className="group relative flex justify-center py-3 px-6 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 ease-in-out"
                    >
                        <span className="flex items-center">
                            <IoMdArrowRoundBack className="mr-2 h-5 w-5" />
                            Go Back
                        </span>
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default PermissionDenied;