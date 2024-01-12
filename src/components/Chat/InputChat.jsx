/* eslint-disable react/prop-types */
export const InputSection = ({handleInputChange, inputMsg, handleSubmit}) => {
    return <>

        <div >
            <div className="bg-white py-4 px-4 flex items-center mx-auto  max-w-[50%]">
                <input
                    onChange={handleInputChange}
                    value={inputMsg}
                    type="text"
                    className="flex-grow border border-gray-300 rounded-l py-2 px-4 focus:outline-none"
                    placeholder="Type your message..."
                />
                <button type="button" onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-r hover:bg-blue-700 focus:outline-none">
                    Send
                </button>
            </div>

        </div>

    </>
}