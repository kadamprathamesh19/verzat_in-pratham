import React, { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import { useMissionVision } from "../context/MissionVisionContext";

const Mission = () => {
  const { data, loading } = useMissionVision();

  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
    AOS.refresh();
  }, []);

  if (loading) return <div className="text-center py-24">Loading...</div>;
  if (!data) return <div className="text-center py-24">No data available</div>;

  return (
    <section id="mission" className="bg-white text-[#111] py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* Mission Section */}
        <div
          className="flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0 md:space-x-12 bg-white shadow-lg rounded-xl p-6 min-h-[300px] md:min-h-[360px]"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div
            className="md:w-1/3 flex justify-center items-center"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <img
              src={data.missionImageUrl}
              alt="Mission"
              className="w-[240px] h-[240px] object-contain"
            />
          </div>

          <div
            className="md:w-2/3 relative bg-white rounded-md p-6 shadow-md"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <h2 className="text-4xl font-bold text-[#1a1a7f] mb-4">{data.missionTitle}</h2>
            <p className="text-md text-[#333] leading-relaxed">{data.missionDescription}</p>
          </div>
        </div>

        {/* Vision Section */}
        <div
          className="flex flex-col md:flex-row-reverse items-center justify-between space-y-10 md:space-y-0 md:space-x-12 bg-white shadow-lg rounded-xl p-6 min-h-[300px] md:min-h-[360px]"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div
            className="md:w-1/3 flex justify-center items-center"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <img
              src={data.visionImageUrl}
              alt="Vision"
              className="w-[240px] h-[240px] object-contain"
            />
          </div>

          <div
            className="md:w-2/3 relative bg-white rounded-md p-6 shadow-md"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <h2 className="text-4xl font-bold text-[#1a1a7f] mb-4">{data.visionTitle}</h2>
            <p className="text-md text-[#333] leading-relaxed">{data.visionDescription}</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Mission;
