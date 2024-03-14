import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";

import { Info } from "../_components/info";

import { LogsList } from "./_components/logs-list";

const LogsPage = async () => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-2" />
      <Suspense fallback={<LogsList.Skeleton />}>
        <LogsList />
      </Suspense>
    </div>
  );
};

export default LogsPage;
