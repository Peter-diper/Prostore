import { Fragment } from "react";

const FIELD_LABEL_WIDTHS = ["w-16", "w-14", "w-8", "w-24", "w-14"];

export default function ShippingAddressSkeleton() {
  return (
    <main className="flex-1 wrapper animate-pulse">
      {/* Checkout Steps */}
      <div className="flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0">
        {[1, 2, 3, 4].map((step) => (
          <Fragment key={step}>
            <div className="h-9 w-56 rounded-full bg-gray-200" />
            {step < 4 && <div className="mx-2 h-px w-16 bg-gray-200" />}
          </Fragment>
        ))}
      </div>

      {/* Form */}
      <div className="mx-auto max-w-md space-y-5">
        <div className="mt-4 space-y-2">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="h-4 w-64 rounded bg-gray-200" />
        </div>

        {/* 5 fields: Fullname, Address, City, Postal Code, Country */}
        <div className="flex flex-col gap-6">
          {FIELD_LABEL_WIDTHS.map((width, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className={`h-4 rounded bg-gray-200 ${width}`} />
              <div className="h-9 w-full rounded-4xl bg-gray-200" />
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="h-9 w-28 rounded-4xl bg-gray-200" />
      </div>
    </main>
  );
}
