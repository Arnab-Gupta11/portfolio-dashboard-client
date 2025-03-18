import { ImSpinner2 } from "react-icons/im";
const Loader = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] w-full flex items-center justify-center">
      <span className="w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18">
        <ImSpinner2 className="animate-spin text-2xl" />
      </span>
    </div>
  );
};

export default Loader;
