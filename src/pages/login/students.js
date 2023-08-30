import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(null);
    const origin = window.location.origin;

    try {
      const res = await fetch(origin + "/api/login/students", {
        body: JSON.stringify({
          email,
          password,
        }),
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 200) {
        Router.replace(`/students/${data?.id}`);
      } else if (res.status === 400) {
        setIsError(data.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button>
        <Link href="/">Back</Link>
      </Button>
      <p>Student Login:</p>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <label style={{ marginTop: "1rem" }}>Email</label>
        <Input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        <label style={{ marginTop: "1rem" }}>Password</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          name="password"
        />
        <Button
          type="submit"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          {isLoading ? "Submitting" : "Submit"}
        </Button>
        {isError ? isError : ""}
      </form>
    </div>
  );
}
