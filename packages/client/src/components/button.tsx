import clsx from "clsx";

type ButtonProps = {
  color?: "primary" | "secondary";
} & React.ComponentProps<"button">;

const Button = ({
  children,
  className,
  color = "primary",
  ...restProps
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        "rounded-md font-medium",
        color === "primary" && "bg-slate-50 hover:bg-slate-200 text-slate-950",
        color === "secondary" &&
          "bg-slate-700 hover:bg-slate-800 text-slate-400",
        className,
      )}
      {...restProps}>
      {children}
    </button>
  );
};

export default Button;
