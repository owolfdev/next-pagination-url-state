import Image from "next/image";
import Pagination from "../components/pagination";
import Data from "../components/data";
import { fetchTotalEmployeeCount } from "@/lib/data";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  //count the total number of records
  const totalRecords = await fetchTotalEmployeeCount();
  //set the number of records per page displayed
  const numberOfRecordsPerPage = 5;

  const page = parseInt(
    typeof searchParams.page === "string" ? searchParams.page : "1",
    10
  );

  const pageNumber = isNaN(page) ? 1 : page;

  return (
    <main className="flex min-h-screen flex-col items-center py-12 gap-8">
      <div>
        <Pagination records={totalRecords} limit={numberOfRecordsPerPage} />
      </div>
      <div className="flex gap-4 text-4xl font-bold w-[150px]">
        <div>Page:</div> <div>{page}</div>
      </div>

      <div>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Data
          records={totalRecords}
          page={pageNumber}
          limit={numberOfRecordsPerPage}
        />
        {/* </Suspense> */}
      </div>
    </main>
  );
}
