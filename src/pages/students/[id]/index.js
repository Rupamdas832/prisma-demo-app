export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query;
  let studentData = {};

  try {
    const res = await fetch(`http://localhost:3000/api/students/${id}`);
    studentData = await res.json();
  } catch (error) {
    console.log(error);
  }

  return {
    props: { studentData },
  };
}

export default function Student({ studentData }) {
  return (
    <div>
      <p>Student #{studentData.id}</p>
    </div>
  );
}
