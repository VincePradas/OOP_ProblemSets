import useIsMobile from "../hooks/useIsMobileHook";
import DepartmentCard from "./DepartmenCard";

//MARK: DEPARTMENTS
const Departments = () => {
  const isMobile = useIsMobile();
  return (
    <div
      className={`bg-black h-auto text-white py-4 ${isMobile ? "mb-5" : ""}`}
    >
      <div className="text-center mb-8 md:mb-12">
        <h2
          className={`${
            isMobile ? "text-[32px]" : "text-[64px]"
          } font-bold mb-2`}
        >
          DEPARTMENTS
        </h2>
        <p className={`${isMobile ? "text-base" : "text-[18px]"} opacity-80`}>
          The Backbone of Our Operations
        </p>
      </div>
      <div className="mx-4 md:mx-10 px-4 border-2 border-white border-opacity-25 rounded-lg py-4">
        <div
          className={`${
            isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-2 gap-8"
          }`}
        >
          <DepartmentCard
            title="General Affairs Department"
            description={
              <>
                The{" "}
                <span className="font-poetsen">
                  MSL Philippines General Affairs Department (GA)
                </span>{" "}
                is in charge of keeping the equilibrium between each branch of
                the organization. While eyeing that every department meets its
                goals and functions properly, GA keeps track that rewards and
                key performance indicators (KPIs) are liquidated properly. They
                also ensure that programs such as the Student Leader School
                Events Partnership Program (SL SEPP), SL Application, and many
                more, are implemented appropriately. As a balance keeper, GA
                strives that fairness remains at large within the organization.
              </>
            }
          />
          <DepartmentCard
            title="Campus Department"
            description={
              <>
                The{" "}
                <span className="font-poetsen">
                  MSL Philippines Campus Department (CaD)
                </span>{" "}
                is in charge of keeping the constancy of affairs with the
                partnered schools/esports organizations. Herewith, they are
                responsible for the existence of tournaments and other
                activities that provide avenues to cultivate students'
                engagements to the highest level. CaD also assesses and
                implements necessary changes for the betterment of the campuses
                affiliated with while anchoring all in terms of rules, core
                values and structure of the CaD. While taking up the
                responsibility to strengthen student's competitiveness by
                engaging in online and offline campus tournaments, CaD strives
                also to see that activities administered initiate relations that
                benefit both students and the MSL community.
              </>
            }
          />
          <DepartmentCard
            title="Contents and Social Media Department"
            description={
              <>
                The{" "}
                <span className="font-poetsen">
                  MSL Philippines Contents and Social Media Department (CSMD)
                </span>{" "}
                is in charge of keeping the organization visible at all times.
                They produce, they write, and they oversee the content creation
                of the organization. They are also responsible for maintaining
                the consistency of the branding of MSL Philippines. Through
                effective management of the social media platforms the
                organization is in possession with, and through providing
                quality, entertaining, and informative contents, CSMD strives to
                create an interactive, optimized, and well-managed avenue for
                everyone to hone camaraderie and healthy engagements.
              </>
            }
          />
          <DepartmentCard
            title="Partnership Department"
            description={
              <>
                The{" "}
                <span className="font-poetsen">
                  MSL Philippines Partnerships Department (PaD)
                </span>{" "}
                is in charge of keeping the steadiness of the internal and
                external functionalities of the organization. They supervise
                whereabouts such as MSL-SP Promotions (giveaways, etc.), MSL
                Philippines website database management, Student Leaders
                applicant screening and selection, and funding and allocation of
                budget. Moreover, they are the bridge in a collaborative
                atmosphere between the departments of MSL Philippines while
                ensuring also that alliances and partnerships with benefactors
                external to the organization are maintained accurately. In
                pursuit of equipoise, PaD strives to maintain sturdy connections
                and outstanding collaborations inside and outside of MSL.
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Departments;
