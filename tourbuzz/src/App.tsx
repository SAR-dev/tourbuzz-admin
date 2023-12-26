import Images from "./pages/Gallery";
import { SideNav } from "./components/SideNav";
import { ToastContainer } from 'react-toastify';
import { PageName, usePageStore } from "./store";
import Writers from "./pages/Writers";

const App = () => {
  const { page } = usePageStore();

  return (
    <div className="inline-flex w-full">
      <SideNav />

      <div className="h-screen w-full bg-gray-200 overflow-y-auto p-5">
        {page === PageName.Gallery && <Images />}
        {page === PageName.Writers && <Writers />}
      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
      />
    </div>
  );
}

export default App;
