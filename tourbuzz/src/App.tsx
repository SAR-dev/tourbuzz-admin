import Images from "./pages/Gallery";
import { SideNav } from "./components/SideNav";
import { ToastContainer } from "react-toastify";
import Writers from "./pages/Writers";
import Articles from "./pages/Articles";
import CreateArticle from "./pages/CreateArticle";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CreateWriter from "./pages/CreateWriter";
import UpdateWriter from "./pages/UpdateWriter";
import UpdateArticle from "./pages/UpdateArticle";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/images" />} />
          <Route
            path="/images"
            element={
              <SideNav>
                <Images />
              </SideNav>
            }
          />
          <Route
            path="/writers"
            element={
              <SideNav>
                <Writers />
              </SideNav>
            }
          />
          <Route
            path="/writers/create"
            element={
              <SideNav>
                <CreateWriter />
              </SideNav>
            }
          />
          <Route
            path="/writers/update/:writerId"
            element={
              <SideNav>
                <UpdateWriter />
              </SideNav>
            }
          />
          <Route
            path="/articles"
            element={
              <SideNav>
                <Articles />
              </SideNav>
            }
          />
          <Route
            path="/articles/create"
            element={
              <SideNav>
                <CreateArticle />
              </SideNav>
            }
          />
          <Route
            path="/articles/update/:articleId"
            element={
              <SideNav>
                <UpdateArticle />
              </SideNav>
            }
          />
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
