import { twMerge } from "tailwind-merge";

type GridContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const GridContainer: React.FC<GridContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      aria-label="container for dashboard grid"
      className={twMerge("grid grid-cols-1 gap-4", className)}
    >
      {children}
    </div>
  );
};

export default GridContainer;
