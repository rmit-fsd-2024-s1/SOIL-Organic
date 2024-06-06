import WeekSpecials from "./weekSpecials";
import background from "./img/background.jpg";

function Home() {
  return (
    <div>
      <div
        className="flex py-10 bg-cover bg-center h-1/3"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="flex flex-col justify-center items-center w-1/3 py-12 flex-grow px-32 bg-opacity-75 rounded-lg ">
          <h1 className="flex justify-center text-2xl">About Us</h1>

          <p className="text-xl">
            We are a premium organic food grocer with several store locations
            around Melbourne. We focus on bringing premium, organic fresh food
            to the community.
          </p>
        </div>
        <div className="flex flex-col items-center w-1/2 py-12 flex-grow px-32">
          <h1 className="text-2xl">Contact Us: </h1>
          <p className="text-xl py-3">Email: soilgrocery@gmail.com</p>
          <p className="text-xl">Phone: 03 1234 5678</p>
        </div>

        {/* Add more content about organic foods and nutritional advice */}
      </div>
      <div className="flex flex-col justify-center items-center  py-12 flex-grow px-32 ">
        <WeekSpecials />
      </div>
    </div>
  );
}

export default Home;
