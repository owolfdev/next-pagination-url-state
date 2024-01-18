"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function Pagination({ records, limit }: { records: number; limit: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialPage = searchParams.get("page");
  const [page, setPage] = React.useState(initialPage ? Number(initialPage) : 1);
  const [loading, setLoading] = React.useState(false);

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

  React.useEffect(() => {
    setLoading(false);
  }, [page, pathname, router]);

  const handleClick = () => {
    setLoading(true);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-screen">
      <div className="text-2xl font-bold">Pagination</div>
      <div className="flex gap-6 text-2xl font-bold">
        <Link href={`${pathname}?page=${page - 1}`} passHref>
          <button
            className="border rounded px-2 disabled:opacity-50"
            disabled={page === 1}
            onClick={handleClick}
          >
            {"<-"}
          </button>
        </Link>

        <div>
          {page} of {Math.ceil(records / limit)}
        </div>

        <Link href={`${pathname}?page=${page + 1}`} passHref>
          <button
            className="border rounded px-2 disabled:opacity-50"
            disabled={page === Math.ceil(records / limit)}
          >
            {"->"}
          </button>
        </Link>
      </div>
      <div>{loading && <span>Loading...</span>}</div>
    </div>
  );
}

export default Pagination;
