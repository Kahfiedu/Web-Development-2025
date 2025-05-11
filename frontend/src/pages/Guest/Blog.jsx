
const Blog = () => {


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Search Bar */}
      <div className="flex justify-center my-6 px-4">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Cari"
            className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </span>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="flex flex-wrap justify-center gap-6 px-4 mb-8">
        {/* Card 1 - Green with button */}
        <div className="bg-gradient-to-r from-green-700 to-green-500 text-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">Lorem</h2>
          <p className="mb-6 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex justify-center">
            <button className="bg-white text-green-600 px-5 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-100">
              <span>Selengkapnya</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Card 2 - White */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">Lorem</h2>
          <p className="mb-6 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Card 3 - White */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">Lorem</h2>
          <p className="mb-6 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      {/* Color Palette */}
      <div className="flex flex-wrap justify-center gap-4 p-4">
        <div className="w-10 h-10 bg-green-700 rounded-sm"></div>
        <div className="w-10 h-10 bg-green-200 rounded-sm"></div>
        <div className="w-10 h-10 bg-green-100 rounded-sm"></div>
        <div className="w-10 h-10 bg-green-50 rounded-sm"></div>
      </div>
    </div>
  );
};

export default Blog;
