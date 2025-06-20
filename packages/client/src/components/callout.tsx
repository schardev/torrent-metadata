import { InfoCircle } from "iconoir-react";
import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

const calloutVariants = tv({
  base: "border rounded-md p-4",
  variants: {
    color: {
      info: "text-cyan-500 border-cyan-500",
      error: "text-red-500 border-red-500",
    },
  },
  defaultVariants: {
    color: "info",
  },
});

type CalloutProps = {
  children?: React.ReactNode;
  className?: string;
  title: string;
  variant?: VariantProps<typeof calloutVariants>;
};

const Callout = ({ title, children, variant, className }: CalloutProps) => {
  return (
    <div className={clsx(calloutVariants({ ...variant, className }))}>
      <div className="flex gap-2 items-center mb-4">
        <InfoCircle className="text-sm" />
        <span className="font-medium">{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Callout;
