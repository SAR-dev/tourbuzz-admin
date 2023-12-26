import Images from "./pages/Images";
import { SideNav } from "./components/SideNav";

const App = () => {
  return (
    <div className="inline-flex w-full">
      <SideNav />

      <div className="h-screen w-full bg-gray-200 overflow-y-auto p-5">
        <Images />
      </div>
    </div>
  );
}

export default App;
