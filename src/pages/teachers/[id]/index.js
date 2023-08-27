import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Teacher() {
  const { query } = useRouter();
  const id = query["id"];
  const [teacherData, setTeacherData] = useState({});

  const fetchData = async (teacherId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/teachers/${teacherId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setTeacherData(data);
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
    <div>
      <Button type="submit">
        <Link href="/teachers">Teachers</Link>
      </Button>
      <div>
        <p>Teacher #{teacherData?.id}</p>
        <Button type="submit">
          <Link href={`/teachers/${teacherData?.id}/edit`}>Edit</Link>
        </Button>
      </div>

      <p>
        Name: {teacherData?.firstName} {teacherData?.lastName}
      </p>
      <p>Email: {teacherData?.email}</p>
      <p>Age: {teacherData?.age}</p>
      <p>Gender: {teacherData?.gender}</p>
    </div>
  );
}
