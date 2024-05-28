import IMAGE from "./img/homepage.jpg";
import WeekSpecials from "./weekSpecials";

function Home() {
  const BackyardGardening = () => {
    return (
      <div className=" flex justify-center items-center flex-col mb-16">
        <h2 className="text-3xl flex justify-center py-8">
          Backyard Gardening Advice
        </h2>
        <p className="text-xl w-4/5">
          Organic fruits offer numerous benefits for both human health and the
          environment. By growing fruits without the use of synthetic
          pesticides, herbicides, and fertilizers, you can ensure that your
          produce is free from harmful chemical residues. Organic farming
          practices also promote biodiversity, support healthy soil, and reduce
          pollution. Additionally, many people find that organic fruits have
          better flavor and higher nutritional value compared to conventionally
          grown produce. Here are some tips for growing fruits in your backyard:
        </p>
        <ul className="text-xl">
          <li>
            ~ Choose a sunny location with well-draining soil and enrich it with
            organic matter.
          </li>
          <li>
            ~ Select suitable, disease-resistant fruit varieties adapted to your
            climate.
          </li>
          <li>
            ~ Use companion planting, organic fertilizers, and natural pest
            control methods.
          </li>
          <li>
            ~ Prune regularly to maintain plant health and improve fruit
            quality.
          </li>
          <li>
            ~ Provide consistent moisture and be patient, as growing organic
            fruits requires time and effort
          </li>
        </ul>
      </div>
    );
  };

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
      <div>
        <BackyardGardening></BackyardGardening>
      </div>
    </div>
  );
}

export default Home;
