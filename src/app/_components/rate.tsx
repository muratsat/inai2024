"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Star } from "lucide-react";
import { api } from "@/trpc/react";
import { toast } from "sonner";

interface RateDriverProps {
  id: number;
  name: string;
}

const ratings = [1, 2, 3, 4, 5];

export function RateDriverForm({ id, name }: RateDriverProps) {
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(1);

  const reviewQuery = api.driver.addReview.useMutation({
    onSuccess: () => {
      setComment("");
      toast("Your review was sent succesfully");
    },
  });

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          Rate driver <b>{name} </b>
        </CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Driver", id, ",", stars, "stars", comment);
          reviewQuery.mutate({
            comment: comment,
            driverId: id,
            stars: stars,
          });
        }}
      >
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="review">Comment</Label>
              <Input
                id="review"
                placeholder="Your comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <div className="flex flex-row gap-2">
                {ratings.map((value) => (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setStars(value);
                    }}
                    key={value}
                  >
                    <Star
                      size={35}
                      fill={stars >= value ? "Yellow" : undefined}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit">Send review</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
