"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Cell, Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// better try to use api not direct use this.
import { Portfolio } from "@/lib/type";
// import { mock_data } from "@/lib/mock-data";
import { useState, useEffect } from "react";

export const description = "A donut chart with text";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  holding_ratio: {
    label: "holding_ratio",
  },
  VOO: {
    label: "VOO",
    color: "var(--chart-1)",
  },
  AAPL: {
    label: "AAPL",
    color: "var(--chart-2)",
  },
  GOOGL: {
    label: "GOOGL",
    color: "var(--chart-3)",
  },
  MSFT: {
    label: "MSFT",
    color: "var(--chart-4)",
  },
  BTC: {
    label: "BTC",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ChartPieDonutText() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  // convert number to specified string
  const formatSignedNumber = (value: number, prefix = "") => {
    const sign = value > 0 ? "+" : value < 0 ? "-" : "";

    return `${sign}${prefix}${Math.abs(value).toLocaleString()}`;
  };
  const gainText = portfolio
    ? `${formatSignedNumber(portfolio.total_gain_amount, "¥")} (${formatSignedNumber(
        portfolio.total_gain_ratio
      )}%)`
    : "Loading...";
  // fetch mock data
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/portfolio");
      const data = await response.json();
      // save the returned mock data into use state
      setPortfolio(data.mock_data);
    }
    fetchData();
  }, []);

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={portfolio?.holding_assets} // 使用 portfolio 数据
              dataKey="holding_ratio" // 数值字段
              nameKey="asset.name" // 名称字段（嵌套）
              innerRadius={60}
              strokeWidth={5}
            >
              {portfolio?.holding_assets.map((item) => (
                <Cell
                  key={item.asset.ticker_symbol}
                  fill={`var(--color-${item.asset.ticker_symbol})`}
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const gain = portfolio?.total_gain_amount ?? 0;
                    const gainColor =
                      gain > 0
                        ? "text-green-500"
                        : gain < 0
                          ? "text-red-500"
                          : "text-gray-500";
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {portfolio
                            ? `¥${portfolio.total_asset_amount.toLocaleString("en-US")}`
                            : "Loading..."}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {gainText}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total assets for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
