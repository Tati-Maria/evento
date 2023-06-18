interface HeadingProps {
  title: string;
  subText?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subText,
  center = false,
}) => {
  return (
    <article className={`${center ? "text-center" : "text-left"} mb-8`}>
      <h2 className={`text-3xl font-bold mb-2`}>{title}</h2>
      {subText && (
        <p className="text-neutral-500 mb-4 font-light text-sm md:text-base">
          {subText}
        </p>
      )}
    </article>
  );
};

export default Heading;
