import classNames from "classnames";
import { usePageStore } from "./store";
import Images from "./pages/Images";

const App = () => {
  const { page, setPage } = usePageStore();

  const NavButton = ({ name, slug }: { name: string, slug: string }) => (
    <li>
      <button className={classNames({
        "font-semibold rounded px-2 py-1.5 w-full text-left": true,
        "bg-black text-white": page == slug,
        "hover:bg-blue-50 hover:text-gray-700": page != slug
      })} onClick={() => setPage(slug)}>
        {name}
      </button>
    </li>
  );

  return (
    <div className="inline-flex w-full">
      <div className="flex h-screen w-64 flex-col justify-between border-e bg-white">
        <div>
          <div className="inline-flex w-full items-center p-2 space-x-3">
            <div className="flex text-sm font-semibold w-10 h-10 justify-center items-center rounded bg-black text-white">
              T
            </div>
            <div className="font-semibold">
              TourBuzz
            </div>
          </div>

          <div className="border-t border-gray-100">
            <div className="px-2">
              <ul className="space-y-3 border-t border-gray-100 pt-2">
                <NavButton name="Gallery" slug="gallery" />
                <NavButton name="Writers" slug="writers" />
                <NavButton name="Articles" slug="articles" />
                <NavButton name="Hotels" slug="hotels" />
                <NavButton name="Places" slug="places" />
                <NavButton name="Enqueries" slug="enq" />
                <NavButton name="Tour Types" slug="tourtypes" />
                <NavButton name="Tours" slug="tours" />
                <NavButton name="Users" slug="users" />
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen w-full bg-gray-100 overflow-y-auto p-5">
        <Images />
      </div>
    </div>
  );
}

export default App;
