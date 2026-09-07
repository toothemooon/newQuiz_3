import { ChartPieDonutText } from "@/components/ui/chart-pie";
import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <ChartPieDonutText />
          <Card>test1</Card>
          <Card>test2</Card>
          <Card>test3</Card>
          <Card>test4</Card>
          <Card>test5</Card>
        </div>
      </div>
    </div>
  );
}
