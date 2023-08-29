import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Router from "next/router";
import { useState } from "react";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const origin = window.location.origin;

    fetch(origin + "/api/login/students", {
      body: JSON.stringify({
        email,
        password,
      }),
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => await res.json())
      .then((data) => {
        Router.replace(`/students/${data?.id}`);
      });
  };

  return (
    <div>
      <p>Student Login:</p>
      <form onSubmit={onSubmit}>
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
    </div>
  );
}
