import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
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
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (studentId) => {
    const origin = window.location.origin;
    setIsLoading(true);

    try {
      const res = await fetch(origin + `/api/students/${studentId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setFirstName(data?.firstName);
      setLastName(data?.lastName);
      setEmail(data?.email);
      setAge(data?.age);
      setGender(data?.gender);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = async (studentId, payload) => {
    const origin = window.location.origin;
    try {
      const res = await fetch(origin + `/api/students/${studentId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        credentials: "include",
      });
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
    <Layout>
      <Button type="submit" onClick={back}>
        Back
      </Button>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
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
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
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
      )}
    </Layout>
  );
}
