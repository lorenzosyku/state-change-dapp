function Element() {
  return (
    <div className="md:flex items-center justify-center min-h-screen ">
      <div className="z-10 grid justify-items-center rounded-md bg-blue-400">
        <form className="md:flex flex-col max-w-2xl mx-auto border rounded-md shadow-md ">
          <label className="block mb-5 px-5 space-y-5">
            <span className="text-white font-semibold italic text-xl py-5">
              CHANGE THE STATE FROM 0 TO ANOTHER NUMBER
            </span>
            <input
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
              type="number"
              placeholder="0"
            />
          </label>
          <div className="flex items-center justify-center">
            <button className="text-white p-1 border-2 w-1/3 m-5 hover:bg-indigo-500 hover:text-gray-300">
              Get the state
            </button>
            <button className="text-white p-1 border-2 w-1/3 m-5 hover:bg-blue-500 hover:text-gray-300">
              Update the state
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Element;
