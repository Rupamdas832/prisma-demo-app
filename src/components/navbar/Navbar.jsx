import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
  const onLogoutClick = async () => {
    const origin = window.location.origin;
    try {
      const res = await fetch(origin + "/api/admin/logout", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100vw",
        borderBottom: "1px solid white",
      }}
    >
      <p>Pathsalla</p>
      <div>
        <Button type="submit">
          <Link href="/teachers">Teachers</Link>
        </Button>
        <Button type="submit">
          <Link href="/students">Students</Link>
        </Button>
      </div>
      <Button type="submit" onClick={onLogoutClick}>
        Logout
      </Button>
    </nav>
  );
};

export default Navbar;
