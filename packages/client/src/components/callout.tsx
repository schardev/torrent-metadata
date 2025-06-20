import { InfoCircle } from "iconoir-react";
import clsx from "clsx";

type CalloutProps = {
  children?: React.ReactNode;
  className?: string;
  title: string;
  variant?: { color?: "info" | "error" };
};

const Callout = ({ title, children, variant, className }: CalloutProps) => {
  const { color = "info" } = variant ?? {};

  return (
    <div
      className={clsx(
        color === "info" && "text-cyan-500 border-cyan-500",
        color === "error" && "text-red-500 border-red-500",
        className,
      )}>
      <div className="flex gap-2 items-center mb-4">
        <InfoCircle className="text-sm" />
        <span className="font-medium">{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Callout;
