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
    <article className={`text-center sm:text-left`}>
      <h2 className={`text-3xl font-bold mb-2`}>{title}</h2>
      {subText && (
        <p className="text-neutral-500 font-light text-sm md:text-base">
          {subText}
        </p>
      )}
    </article>
  );
};

export default Heading;
