import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button-1";
import clsx from "clsx";

type TOverflowType = "x" | "y" | "both";

interface ScrollerProps {
  children: React.ReactNode;
  overflow: TOverflowType;
  height?: number | string;
  width?: number | string;
  withButtons?: boolean;
  childrenContainerClassName?: string;
  bgColor?: string;
  noOverflowHidden?: boolean;
}

const ArrowLeft = () => (
  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
    <path fillRule="evenodd" clipRule="evenodd" d="M10.5 14.0607L9.96966 13.5303L5.14644 8.7071C4.75592 8.31658 4.75592 7.68341 5.14644 7.29289L9.96966 2.46966L10.5 1.93933L11.5607 2.99999L11.0303 3.53032L6.56065 7.99999L11.0303 12.4697L11.5607 13L10.5 14.0607Z" />
  </svg>
);

const ArrowRight = () => (
  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
    <path fillRule="evenodd" clipRule="evenodd" d="M5.50001 1.93933L6.03034 2.46966L10.8536 7.29288C11.2441 7.68341 11.2441 8.31657 10.8536 8.7071L6.03034 13.5303L5.50001 14.0607L4.43935 13L4.96968 12.4697L9.43935 7.99999L4.96968 3.53032L4.43935 2.99999L5.50001 1.93933Z" />
  </svg>
);

export const Scroller = ({
  children, overflow, height = "100%", width = "100%",
  withButtons, childrenContainerClassName, bgColor = "white", noOverflowHidden = false,
}: ScrollerProps) => {
  const items = React.Children.toArray(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftOverlay, setShowLeftOverlay] = useState(false);
  const [showRightOverlay, setShowRightOverlay] = useState(false);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastScrollByWheel, setLastScrollByWheel] = useState(false);

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < items.length) {
      setCurrentIndex(index);
      itemsRef.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
  };

  const handleButtonClick = (direction: "next" | "prev") => {
    const next = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    scrollToIndex(next);
    setLastScrollByWheel(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setShowLeftOverlay(scrollLeft > 0);
        setShowRightOverlay(scrollLeft + clientWidth < scrollWidth - 1);
      }
    };
    handleScroll();
    const el = containerRef.current;
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, [overflow]);

  return (
    <div
      className={clsx("relative flex flex-col gap-2", !noOverflowHidden && "overflow-hidden")}
      style={{ width, height }}
    >
      <div
        className={clsx("flex relative hide-scrollbar overflow-auto", overflow === "x" ? "flex-row" : "flex-col", childrenContainerClassName)}
        ref={containerRef}
        onWheel={() => setLastScrollByWheel(true)}
      >
        {items.map((child, index) => (
          <div key={index} ref={(el) => { itemsRef.current[index] = el; }}>
            {child}
          </div>
        ))}
      </div>
      {withButtons && overflow === "x" && (
        <div className="flex gap-2 mt-2 z-10">
          <Button aria-label="scroll left" svgOnly shape="rounded" size="small" type="secondary" onClick={() => handleButtonClick("prev")}><ArrowLeft /></Button>
          <Button aria-label="scroll right" svgOnly shape="rounded" size="small" type="secondary" onClick={() => handleButtonClick("next")}><ArrowRight /></Button>
        </div>
      )}
      {/* Left fade */}
      <div
        className={clsx("absolute top-0 bottom-0 w-12 h-full duration-300 pointer-events-none", showLeftOverlay ? "left-0" : "-left-12")}
        style={{ background: `linear-gradient(to right, ${bgColor}, transparent)` }}
      />
      {/* Right fade */}
      <div
        className={clsx("absolute top-0 bottom-0 w-12 h-full duration-300 pointer-events-none", showRightOverlay ? "right-0" : "-right-12")}
        style={{ background: `linear-gradient(to left, ${bgColor}, transparent)` }}
      />
    </div>
  );
};
