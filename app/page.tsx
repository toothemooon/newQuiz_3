"use client";

import { ChartPieDonutText } from "@/components/ui/chart-pie";
import { Card, CardAction, CardContent } from "@/components/ui/card";
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
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground">
              {item.asset.ticker_symbol}
            </div>
            <div>{item.asset.name}</div>
          </div>
          <CardAction>
            <div className="text-right">
              <div>{item.gain_amount}</div>
              <div>{item.gain_ratio}%</div>
            </div>
          </CardAction>
        </div>
      </CardContent>
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
