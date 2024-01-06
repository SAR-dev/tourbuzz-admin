import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer, TypeOptions } from "react-toastify";
import { SideNav } from "./components/SideNav";
import Images from "./pages/Gallery";
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

const toastClasses: Record<TypeOptions, string> = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning",
  default: "primary"
};

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/images" />} />
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
        </Routes>
      </BrowserRouter>
      <ToastContainer
      // @ts-ignore
        toastClassName={({ type }) => {
          const selectedClass = toastClasses[type as keyof typeof toastClasses] || toastClasses.default;
          return (
            `bg-${selectedClass} relative flex p-3 min-h-14 rounded-md justify-between overflow-hidden cursor-pointer`
          );
        }}
        // @ts-ignore
        bodyClassName={({ type }) => {
          const selectedClass = toastClasses[type as keyof typeof toastClasses] || toastClasses.default;
          return (
            `flex items-center text-${selectedClass}-content`
          );
        }}
        position="bottom-left"
        autoClose={50000}
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
