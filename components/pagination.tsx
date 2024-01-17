"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

function Pagination({ records, limit }: { records: number; limit: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialPage = searchParams.get("page");
  const [page, setPage] = React.useState(initialPage ? Number(initialPage) : 1);

  React.useEffect(() => {
    const pageNum = searchParams.get("page");

    if (!pageNum) {
      router.push(`${pathname}`);
    } else {
      setPage(Number(pageNum));
    }

    if (pageNum === "1") {
      router.push(`${pathname}`);
    }
  }, [searchParams, pathname, router]);

  return (
    <div className="flex flex-col items-center  gap-8 w-screen">
      <div className="text-2xl font-bold">Pagination</div>
      <div className="flex gap-6 text-2xl font-bold ">
        <button
          className="disabled:opacity-50"
          disabled={page === 1}
          onClick={() => router.push(`${pathname}?page=${page - 1}`)}
        >
          <div className="border rounded px-2">{`<-`}</div>
        </button>
        <div>
          {page} of {records / limit}{" "}
        </div>
        <button
          className="disabled:opacity-50"
          onClick={() => router.push(`${pathname}?page=${page + 1}`)}
          disabled={page === records / limit}
        >
          <div className="border rounded px-2">{`->`}</div>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
