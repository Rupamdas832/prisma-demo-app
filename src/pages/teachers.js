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

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/teachers");
      const data = await res.json();
      if (Array.isArray(data)) {
        setTeachers(data);
      } else {
        setTeachers([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Table>
      <TableCaption>A list of Teachers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">First name</TableHead>
          <TableHead>Last name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead className="text-right">Gender</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teachers.map((teacher) => {
          return (
            <TableRow key={teacher?.id}>
              <TableCell className="font-medium">
                {teacher?.firstName}
              </TableCell>
              <TableCell className="font-medium">{teacher?.lastName}</TableCell>
              <TableCell className="font-medium">{teacher?.age}</TableCell>
              <TableCell className="font-medium">{teacher?.gender}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
