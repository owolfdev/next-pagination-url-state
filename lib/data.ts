import { sql, QueryResult } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchEmployees(page: number, limit: number) {
  noStore();

  try {
    // Calculate the offset based on the current page
    const offset = (page - 1) * limit;

    const data = await sql`
            SELECT * FROM employees
            LIMIT ${limit} OFFSET ${offset}`;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

// Define an interface for the result
interface EmployeeCountResult {
  count: number;
}

export async function fetchTotalEmployeeCount(): Promise<number> {
  try {
    const queryResult = await sql`
        SELECT COUNT(*) FROM employees
      `;

    // You might need to adjust this line according to the actual structure of QueryResult
    const resultArray = queryResult.rows;

    if (resultArray && resultArray.length > 0) {
      const totalCount = resultArray[0].count;
      return totalCount;
    } else {
      throw new Error("No data found.");
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total employee count.");
  }
}
