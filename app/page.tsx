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
  const cardData = portfolio?.holding_assets.map((item) => (
    <Card key={item.asset.ticker_symbol}>
      <CardContent>
        <div className="flex items-center gap-4">
          <img
            src={item.asset.logo_url}
            alt={item.asset.ticker_symbol}
            className="h-10 w-10 shrink-0 object-contain"
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="truncate">{item.asset.name}</div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{item.asset.ticker_symbol}</span>
              <span>/</span>
              <span>{item.holding_ratio}%</span>
            </div>
          </div>

          <div className="ml-auto shrink-0 text-right">
            <div>{item.gain_amount}</div>
            <div>{item.gain_ratio}%</div>
          </div>
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
