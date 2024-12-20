'use client';
import { useSession, signIn, signOut } from "next-auth/react"
import TableComponent from "./components/table";

const fetchData = async () => {
  const sheetId = '1G3YOWeTKl2zmBFZb98NbEn2WpJIaUW9Awd-BS8CTcjk';
  const range = 'user_mock_data!A1:O3001';
  const { data: session } = useSession();

  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`,
      {
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${await response.text()}`);
    }

    return response.json();
  } catch (error) {
    console.error("Fetch Data Error:", error);
    return null;
  }
}

export default function Home() {
  fetchData();
  // if (session) {
  //   return <>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }
  // return <>
  //   Not signed in <br />
  //   <button onClick={() => signIn()}>Sign in</button>
  // </>
  return (
    <section className="py-24 h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col md:flex-row gap-16">
        <TableComponent />
      </div>
    </section>
  )
}