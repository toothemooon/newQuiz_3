"use client";

import { ChartPieDonutText } from "@/components/ui/chart-pie";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Portfolio } from "@/lib/type";

export default function Page() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/portfolio");
      const data = await response.json();
      // save the returned mock data into use state
      setPortfolio(data.mock_data);
    }
    fetchData();
  }, []);
  const cardData = portfolio?.holding_assets.map((item: any) => (
    <Card key={item.asset.ticker_symbol}>
      {item.asset.ticker_symbol}
      {item.asset.name}
    </Card>
  ));
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <ChartPieDonutText />
          {cardData}
        </div>
      </div>
    </div>
  );
}
