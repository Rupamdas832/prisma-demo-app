import Navbar from "../navbar/Navbar";
import NavigationLoader from "../navigationLoader/NavigationLoader";

export default function Layout({ children }) {
  return (
    <div className="flex w-full items-center justify-center">
      <NavigationLoader />
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
