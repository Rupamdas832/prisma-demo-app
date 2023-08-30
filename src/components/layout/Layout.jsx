import Navbar from "../navbar/Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex w-full items-center justify-center">
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
