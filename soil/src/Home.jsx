import IMAGE from "./img/homepage.jpg";
import WeekSpecials from "./weekSpecials";

function Home() {
  return (
    <div>
      <div className="flex">
        <div className="flex flex-col justify-center items-center w-1/3  py-12 flex-grow px-32 ">
          <h1 className="flex justify-center text-2xl">About Us</h1>

          <p className="text-xl">
            We are a premium organic food grocer with several store locations
            around Melbourne. We focus on bringing premium, organic fresh food
            to the community.
          </p>
        </div>
        <div className="flex w-2/3">
          <img src={IMAGE} />
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
