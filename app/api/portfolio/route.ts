import { mock_data } from "@/lib/mock-data";

export async function GET() {
  return Response.json({ mock_data });
}
