import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Router from "next/router";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const origin = window.location.origin;

    try {
      const res = await fetch(origin + "/api/admin/login", {
        body: JSON.stringify({
          email,
          password,
        }),
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 200) {
        Router.replace("/teachers");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        name="password"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
