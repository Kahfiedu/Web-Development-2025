
const Blog = () => {

  const blogPosts = [
    { title: "Title", content: "Lorem ipsum dolor sit amet." },
    { title: "Title", content: "Lorem ipsum dolor sit amet." },
    { title: "Title", content: "Lorem ipsum dolor sit amet." },
    { title: "Title", content: "Lorem ipsum dolor sit amet." },
    { title: "Title", content: "Lorem ipsum dolor sit amet." },
    { title: "Title", content: "Lorem ipsum dolor sit amet." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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

      {/* Hero Section */}
      <div className="relative">
        <div className="w-full h-[480px] overflow-hidden">
          <img
            src="img/readquran.jpeg"
            alt="Person reading Quran"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent">
            <div className="h-full flex flex-col justify-center pl-16 max-w-2xl">
              <h1 className="text-5xl font-bold text-white leading-tight">
                Ketika hati dekat dengan Al-Qur'an, hidup pun tenang tanpa alasan.
              </h1>
              <div className="mt-6">
                <p className="text-white text-lg">
                  Di setiap hela napas, ada dzikir yang terucap tanpa suara. Di setiap
                  <br />langkah, ada harapan menuju ampunan-Nya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Blog Posts */}
      <div className="py-8 px-4">
        <h2 className="text-xl font-bold mb-6">Recent blog post</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <img
                  src="/img/quran.jpeg"
                  alt="Blog thumbnail"
                  className="w-full h-32 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button className="px-5 py-2 bg-white text-gray-800 rounded-full border-2 border-gray-300 hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors flex items-center space-x-2">
            <span>Read More</span>
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
    </div>
  );
};

export default Blog;