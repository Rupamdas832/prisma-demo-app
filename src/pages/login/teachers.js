import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";

export default function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const origin = window.location.origin;

    fetch(origin + "/api/login/teachers", {
      body: JSON.stringify({
        email,
        password,
      }),
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => await res.json())
      .then((data) => {
        Router.push(`/teachers/${data?.id}`);
      });
  };

  return (
    <div>
      <Button>
        <Link href="/">Back</Link>
      </Button>
      <p>Teacher Login:</p>
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
