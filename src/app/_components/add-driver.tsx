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
import { api } from "@/trpc/react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AddDriverForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [error, setError] = useState<string | null>(null);

  const driver = api.driver.create.useMutation({
    onMutate: () => {
      console.log("submit");
    },
    onSuccess: () => {
      console.log("success");
      toast("Success");
      setName("");
      setLicensePlate("");
      router.refresh();
    },
    onError: (e) => {
      console.log(e.message);
      setError("Driver with such license plate already exists");
    },
  });

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add driver to database</CardTitle>
        <CardDescription>Specity driver name and license plate</CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // console.log("Submit", name, licensePlate);
          if (name.length === 0 || licensePlate.length === 0) {
            setError("Please fill out all fields");
            return;
          }
          driver.mutate({
            name: name,
            licensePlate: licensePlate,
          });
        }}
      >
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Driver's name"
                value={name}
                onChange={(e) => {
                  setError(null);
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="licenseplate">License plate </Label>
              <Input
                id="licenseplate"
                placeholder="License plate"
                value={licensePlate}
                onChange={(e) => {
                  setError(null);
                  setLicensePlate(e.target.value);
                }}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit">
            {driver.isPending ? "Loading..." : "Add"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
