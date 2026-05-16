import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "public/data/products.json");
    const fileContents = readFileSync(filePath, "utf8");
    const products = JSON.parse(fileContents);
    return Response.json(products);
  } catch (error) {
    console.error("Error reading products:", error);
    return Response.json([], { status: 500 });
  }
}
