import { useQuery } from "@apollo/react-hooks";

import Header from "../Layout/Header";
import DailyVibe from "./DailyVibe";
import FoodSearchBox from "./FoodSearchBox";
import Footer from "./Footer";
import { Spacer } from "./LayoutPrimitives";
import { GET_DASHNAV_STATE } from "../../gql/queries";
import DoughnutContainer from "../graphs/DoughnutContainer";
import { useRouter } from "next/router";
import { isExcludedFromThesePages } from "../../lib/utils";

const Layout = ({ children }) => {
  const { data } = useQuery(GET_DASHNAV_STATE);
  const router = useRouter();
  const pagesToExclude = [
    "/",
    "/login",
    "/signup",
    "/createProfile",
    "/updateProfile",
  ];
  const inOnboarding = isExcludedFromThesePages(router, pagesToExclude);
  const inJournal = data ? data.lowerNav === "journal" : false;

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col flex-1 pl-16 pr-32">
        <div
          className={`${
            inOnboarding ? "hidden" : ""
          } flex my-10 justify-between`}
        >
          <div className="flex flex-col w-1/3">
            <DailyVibe />
          </div>
          <DoughnutContainer />
          <div className="w-1/3 mt-2">
            {!inJournal ? <Spacer /> : <FoodSearchBox />}
          </div>
        </div>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
