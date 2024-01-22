import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SideNav } from "./components/SideNav";
import Images from "./pages/Images";
import Writers from "./pages/Writers";
import Articles from "./pages/Articles";
import CreateArticle from "./pages/CreateArticle";
import CreateWriter from "./pages/CreateWriter";
import UpdateWriter from "./pages/UpdateWriter";
import UpdateArticle from "./pages/UpdateArticle";
import Enqueries from "./pages/Enqueries";
import Organizers from "./pages/Organizers";
import CreateOrganizer from "./pages/CreateOrganizer";
import UpdateOrganizer from "./pages/UpdateOrganizer";
import Hotels from "./pages/Hotels";
import CreateHotel from "./pages/CreateHotel";
import UpdateHotel from "./pages/UpdateHotel";
import Places from "./pages/Places";
import CreatePlace from "./pages/CreatePlace";
import UpdatePlace from "./pages/UpdatePlace";
import CreateTour from "./pages/CreateTour";
import Signin from "./pages/Signin";
import Tours from "./pages/Tours";
import UpdateTour from "./pages/UpdateTour";
import Ads from "./pages/Ads";
import CreateAd from "./pages/CreateAd";
import UpdateAd from "./pages/UpdateAd";
import SigninVerify from "./pages/SigninVerify";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/sign-in" element={<SigninVerify />} />
          <Route path="/images" element={<SideNav children={<Images />} />} />
          <Route path="/writers" element={<SideNav children={<Writers />} />} />
          <Route path="/writers/create" element={<SideNav children={<CreateWriter />} />} />
          <Route path="/writers/:writerId" element={<SideNav children={<UpdateWriter />} />} />
          <Route path="/articles" element={<SideNav children={<Articles />} />} />
          <Route path="/articles/create" element={<SideNav children={<CreateArticle />} />} />
          <Route path="/articles/:articleId" element={<SideNav children={<UpdateArticle />} />} />
          <Route path="/enqueries" element={<SideNav children={<Enqueries />} />} />
          <Route path="/organizers" element={<SideNav children={<Organizers />} />} />
          <Route path="/organizers/create" element={<SideNav children={<CreateOrganizer />} />} />
          <Route path="/organizers/:organizerId" element={<SideNav children={<UpdateOrganizer />} />} />
          <Route path="/hotels" element={<SideNav children={<Hotels />} />} />
          <Route path="/hotels/create" element={<SideNav children={<CreateHotel />} />} />
          <Route path="/hotels/:hotelId" element={<SideNav children={<UpdateHotel />} />} />
          <Route path="/places" element={<SideNav children={<Places />} />} />
          <Route path="/places/create" element={<SideNav children={<CreatePlace />} />} />
          <Route path="/places/:placeId" element={<SideNav children={<UpdatePlace />} />} />
          <Route path="/tours" element={<SideNav children={<Tours />} />} />
          <Route path="/tours/create" element={<SideNav children={<CreateTour />} />} />
          <Route path="/tours/:tourId" element={<SideNav children={<UpdateTour />} />} />
          <Route path="/ads" element={<SideNav children={<Ads />} />} />
          <Route path="/ads/create" element={<SideNav children={<CreateAd />} />} />
          <Route path="/ads/:adId" element={<SideNav children={<UpdateAd />} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
      />
    </>
  );
};

export default App;
