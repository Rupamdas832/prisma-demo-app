import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Layout from "@/components/layout/Layout";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    const origin = window.location.origin;
    setIsLoading(true);

    try {
      const res = await fetch(origin + "/api/students");
      const data = await res.json();
      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Table>
        <TableCaption>A list of Students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">First name</TableHead>
            <TableHead>Last name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead className="text-right">Gender</TableHead>
            <TableHead className="text-right">Teacher Id</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <TableBody>
            {students.map((student) => {
              return (
                <TableRow key={student?.id}>
                  <TableCell className="font-medium">
                    <Link href={`/students/${student?.id}`}>
                      {student?.firstName}
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium">
                    {student?.lastName}
                  </TableCell>
                  <TableCell className="font-medium">{student?.age}</TableCell>
                  <TableCell className="font-medium">
                    {student?.gender}
                  </TableCell>
                  <TableCell className="font-medium">
                    {student?.teacherId}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </Layout>
  );
}
