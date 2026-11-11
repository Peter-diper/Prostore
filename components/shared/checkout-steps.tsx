import React from "react";
import { cn } from "../../lib/utils";
import Link from "next/link";

const CheckOutSteps = ({ current = 0 }) => {
  const steps = [
    "User Login",
    "shipping-address",
    "payment-method",
    "Place Order",
  ];

  return (
    <div className="flex-between flex-col capitalize space-x-2 space-y-2 md-10 md:flex-row">
      {steps.map((step, value) => (
        <React.Fragment key={step}>
          <Link
            href={step === "User Login" ? "#" : step}
            className={cn(
              "p-2 w-56 rounded-full  text-center text-sm",
              value === current ? "bg-secondary" : "",
            )}
          >
            {step}
          </Link>
          {step !== "Place Order" && (
            <hr className="w-16 border-t border-gray-300 mx-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckOutSteps;
