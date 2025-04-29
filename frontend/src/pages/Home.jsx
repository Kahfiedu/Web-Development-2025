const Home = () => (
  <div className="pt-[100px] py-10 px-5 md:px-10">
    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
      <div className="flex-1">
        <h2 className="text-4xl md:text-5xl font-medium mb-4">Kahfi Education</h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum dignissimos esse quas
          recusandae voluptas perferendis asperiores iusto? Fugiat a nostrum esse magni nihil odit
          deserunt natus tempora dolores quae. Doloribus?
        </p>
        <button className="bg-emerald-500 font-medium text-white px-6 py-2 rounded-md hover:bg-emerald-600 transition">
          Daftar Sekarang
        </button>
      </div>
      <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md">
        <img
          className="w-full h-auto object-contain"
          src="src/assets/mosquee.png"
          alt="Mosque"
        />
      </div>
    </div>
  </div>
);

export default Home;
