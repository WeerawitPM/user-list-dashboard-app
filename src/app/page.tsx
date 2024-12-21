import { getSheetData } from "@/app/functions/google-sheets.action";
import TableComponent from "./components/table";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/authOptions";
import { redirect } from "next/navigation";
// import axios from "axios";

// const fetchData = async () => {
//   try {
//     const response = await axios.get(`https://api.sheetbest.com/sheets/6c765f81-c6d9-45c6-a82f-94dcb942868b`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return [];
//   }
// }

export default async function Home() {
  // const data = await fetchData();
  const session = await getServerSession(authOptions)
  if (session) {
    const data: User[] = await getSheetData();
    return (
      <section className="py-12 h-full bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col md:flex-row gap-16">
          <TableComponent data={data} />
        </div>
      </section>
    )
  }
  redirect('/permission-denied');
}