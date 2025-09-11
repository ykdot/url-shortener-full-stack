'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getMainAnalyticsData } from '@/actions/analytics-actions';

type AnalyticsData = {
  total_clicks: string;
  distinct_links: string;
  most_frequent_short_code: string;
};

export default function MainAnalyticsComponent({
  initialData,
}: {
  initialData: AnalyticsData;
}) {
  const [position, setPosition] = useState('top');
  const [dataInfo, setDataInfo] = useState<AnalyticsData>(initialData);
  console.log(dataInfo);
  const handleFilterChange = async () => {
    let days;
    if (position == 'top') {
      days = 28;
    } else {
      days = 7;
    }

    const data = await getMainAnalyticsData(days);
    if (position == 'top') {
      setPosition('bottom');
    } else {
      setPosition('top');
    }
    let total_clicks = data.data.total_clicks;
    let distinct_links = data.data.distinct_links;
    let most_frequent_short_code = data.data.most_frequent_short_code;

    if (total_clicks == null) {
      total_clicks = '0';
    }

    if (most_frequent_short_code == null) {
      most_frequent_short_code = `No links in the past ${days}`;
    }

    setDataInfo({
      total_clicks: total_clicks,
      distinct_links: distinct_links,
      most_frequent_short_code: most_frequent_short_code,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Main Analytics Overview</CardTitle>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={handleFilterChange}
              >
                <DropdownMenuRadioItem value="top">
                  Last 7 Days
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">
                  Last 28 Days
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-5">
          <p>Total Clicks: </p>
          <p>{dataInfo.total_clicks}</p>
        </div>
        <div className="flex flex-row gap-5">
          <p>Total Links: </p>
          <p>{dataInfo.distinct_links}</p>
        </div>
        <div className="flex flex-row gap-5">
          <p>Top Performing Link: </p>
          <p>{dataInfo.most_frequent_short_code}</p>
        </div>
      </CardContent>
    </Card>
  );
}
