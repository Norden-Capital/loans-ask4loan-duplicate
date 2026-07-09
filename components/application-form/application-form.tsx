"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";

export function ApplyForm() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const source = searchParams.get("source");
    const amount = searchParams.get("amount");
    const id = searchParams.get("id");
    const affiliate_sub1 = searchParams.get("affiliate_sub1");
    const affiliate_sub2 = searchParams.get("affiliate_sub2");
    const affiliate_sub5 = searchParams.get("affiliate_sub5");
    const firstname = searchParams.get("firstname");
    const email = searchParams.get("email");

    let conversion: { type?: string } = {};
    if (source === "fb") conversion = { type: "FACEBOOK" };
    else if (source === "tiktok") conversion = { type: "TIKTOK" };

    const formConfig = {
      affiliateCode: id || "4PrKYVa8",
      formId: "1",
      language: "en",
      theme: "light",
      overrides: {
        requestedAmount: {
          max: 3000,
          min: 300,
          step: 100,
        },
      },
      defaultValues: {
        requestedAmount: Number(amount) || 700,
        firstName: firstname || "",
        email: email || "",
      },
      extra: {
        affiliate_sub1: affiliate_sub1 || "ask4loan.xyz",
        affiliate_sub2: affiliate_sub2 || "",
        affiliate_sub5: affiliate_sub5 || null,
        aff_utm_source: source || "",
      },
      conversion,
    };

    window.LeadScout = window.LeadScout || {};
    window.LeadScout.onLoad = () => {
      setIsLoaded(true);
      if (formRef.current && window.LeadScout.init) {
        window.LeadScout.init(formRef.current, formConfig);
      }
    };

    if (window.LeadScout && window.LeadScout.init && !isLoaded) {
      window.LeadScout.onLoad();
    }
  }, [searchParams, isLoaded]);

  return (
    <>
      <Script src="https://app.leadscout.ca/library/library.js" strategy="afterInteractive" />

      <div
        className="relative bg-white border rounded-2xl shadow-xl p-6 md:p-9 overflow-hidden"
        style={{ borderColor: "#E2E8F0" }}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: "#10B981" }}
        />

        <div className="text-center mb-8">
          <h2
            className="text-2xl lg:text-3xl font-bold tracking-tight mb-2"
            style={{ color: "#1F2937" }}
          >
            Get Your Rate in <span style={{ color: "#10B981" }}>2 Minutes</span>
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: "#64748B" }}>
            Our technology compares offers from trusted Canadian lenders to find
            you the best rate. No impact on your credit score.
          </p>
        </div>

        <div id="lead-scout-form" ref={formRef} className="min-h-[450px]">
          {!isLoaded && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div
                className="w-12 h-12 border-4 rounded-full animate-spin mb-4"
                style={{ borderColor: "#E2E8F0", borderTopColor: "#10B981" }}
              />
              <p className="text-sm font-bold" style={{ color: "#10B981" }}>
                Loading your application...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
