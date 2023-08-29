"use client"; // Error components must be Client Components

import BasicAnimLayout from "@/components/layouts/BasicAnimLayout";
import { useEffect } from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <BasicAnimLayout>
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-4 p-4">
        <h2>Something went wrong!</h2>
        <button
          className="button w-fit mx-auto"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          <p className="text-button">Try again</p>
        </button>
      </div>
    </BasicAnimLayout>
  );
};

export default Error;
