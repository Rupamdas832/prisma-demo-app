import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Student() {
  const { query } = useRouter();
  const id = query["id"];
  const [studentData, setStudentData] = useState({});

  const fetchData = async (studentId) => {
    const origin = window.location.origin;
    try {
      const res = await fetch(origin + `/api/students/${studentId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setStudentData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <Layout>
      <div>
        <p>Student #{studentData?.id}</p>
        <Button type="submit">
          <Link href={`/students/${studentData?.id}/edit`}>Edit</Link>
        </Button>
      </div>

      <p>
        Name: {studentData?.firstName} {studentData?.lastName}
      </p>
      <p>Email: {studentData?.email}</p>
      <p>Age: {studentData?.age}</p>
      <p>Gender: {studentData?.gender}</p>
      <p>Teacher id: {studentData?.teacherId}</p>
    </Layout>
  );
}
