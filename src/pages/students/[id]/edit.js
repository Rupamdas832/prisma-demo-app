import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function StudentEdit() {
  const { query, back } = useRouter();
  const id = query["id"];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const fetchData = async (studentId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/students/${studentId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setFirstName(data?.firstName);
      setLastName(data?.lastName);
      setEmail(data?.email);
      setAge(data?.age);
      setGender(data?.gender);
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (studentId, payload) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/students/${studentId}`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const handleClick = () => {
    if (email && firstName && lastName) {
      const payload = { firstName, lastName, email, age, gender };
      updateData(id, payload);
    }
  };

  return (
    <div>
      <Button type="submit" onClick={back}>
        Back
      </Button>
      <div>
        <p>Student #{id}</p>
      </div>
      <div style={{ display: "flex" }}>
        <p style={{ minWidth: "100px" }}>FirstName:</p>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div style={{ display: "flex" }}>
        <p style={{ minWidth: "100px" }}>LastName:</p>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div style={{ display: "flex" }}>
        <p style={{ minWidth: "100px" }}>Email:</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div style={{ display: "flex" }}>
        <p style={{ minWidth: "100px" }}>Age:</p>
        <input value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div style={{ display: "flex" }}>
        <p style={{ minWidth: "100px" }}>Gender:</p>
        <input value={gender} onChange={(e) => setGender(e.target.value)} />
      </div>
      <div>
        <Button type="submit" onClick={handleClick}>
          Update
        </Button>
      </div>
    </div>
  );
}
