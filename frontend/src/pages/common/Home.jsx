import Button from "../../components/common/Button";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-16">

        {/* Left Content */}
        <div className="flex-1">
          <p className="text-blue-600 font-semibold mb-4">
            #1 Tutor Booking Platform
          </p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900 mb-6">
            Find The Best Tutors For Your Learning Journey
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Tutor Adda helps students connect with highly qualified tutors
            across multiple subjects with seamless booking and reviews.
          </p>

          <div className="flex gap-4">
            <Button text="Find Tutors" />
            <Button text="Become a Tutor" />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <div className="bg-black rounded-3xl h-[400px] flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
            Tutor Adda
          </div>
        </div>

      </section>

    </div>
  );
};

export default Home;