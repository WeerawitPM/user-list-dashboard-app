import TableComponent from "./components/table";
import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get(`https://api.sheetbest.com/sheets/6c765f81-c6d9-45c6-a82f-94dcb942868b`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default async function Home() {
  const data = await fetchData();
  console.log(data);
  return (
    <section className="py-24 h-full bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col md:flex-row gap-16">
        <TableComponent data={data} />
      </div>
    </section>
  )
}