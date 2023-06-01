import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: "rounded-md font-medium",
  variants: {
    color: {
      primary: "bg-slate-50 hover:bg-slate-200 text-slate-950",
      secondary: "bg-slate-700 hover:bg-slate-800 text-slate-400",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

type ButtonProps = {
  variant?: VariantProps<typeof buttonVariants>;
} & React.ComponentProps<"button">;

const Button = ({
  children,
  className,
  variant,
  ...restProps
}: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ ...variant, className })}
      {...restProps}>
      {children}
    </button>
  );
};

export default Button;
