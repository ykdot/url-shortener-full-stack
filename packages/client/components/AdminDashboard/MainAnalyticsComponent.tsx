"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MainAnalyticsComponent() {
  const [position, setPosition] = useState("top")
  let clicks = 5;
  let total_links = 4;
  let example_link = "https://www.youtube.com/watch?v=YXHe2tPPbGk";
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
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="top">Last 7 Days</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">Last 30 Days</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-5">
          <p>Total Clicks: </p>
          <p>{clicks}</p>
        </div>
        <div className="flex flex-row gap-5">
          <p>Total Links: </p>
          <p>{total_links}</p>
        </div>
        <div className="flex flex-row gap-5">
          <p>Top Performing Link: </p>
          <p>{example_link}</p>
        </div>
      </CardContent>
  </Card>
  );
}
