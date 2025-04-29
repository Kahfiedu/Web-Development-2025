const About = () => (
  <div className="pt-[100px] py-10 px-5 md:px-10">
  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
    <div className="flex-1">
      <h2 className="text-4xl md:text-5xl font-medium mb-4">Tentang Kami</h2>
      <p className="text-gray-600 mb-6 max-w-md text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum dignissimos esse quas
        recusandae voluptas perferendis asperiores iusto? Fugiat a nostrum esse magni nihil odit
        deserunt natus tempora dolores quae. Doloribus?
      </p>
    </div>
    <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md">
      <img
        className="w-full h-auto object-contain"
        src="src/assets/quran.png"
        alt="Mosque"
      />
    </div>
  </div>

  <div className="flex flex-col md:flex-row gap-6 items-center mt-10 mx-auto bg-emerald-300 p-5 w-11/12 md:w-10/12 rounded-xl">
    <div className="flex-1">
      <h3 className="text-2xl font-medium mb-2">Maps</h3>
      <p className="text-base md:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis eaque excepturi impedit
        at accusamus nesciunt quisquam neque non amet placeat quaerat quasi sapiente, velit quae
        veniam rem nisi enim ullam.
      </p>
    </div>
    <div className="flex-1 max-w-md">
      <img src="src/assets/maps.png" alt="Maps" className="w-full h-auto object-contain" />
    </div>
  </div>
</div>
);

export default About;
