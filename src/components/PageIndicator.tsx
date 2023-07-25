function PageIndicator({
  pageCount,
  currentPage,
  className,
}: {
  pageCount: number;
  currentPage: number;
  className: string;
}) {
  return (
    <ul className={`list-none flex gap-1 ${className}`}>
      {Array(pageCount)
        .fill(0)
        .map((page, index) => (
          <li
            key={index}
            className={`w-3 h-0.5 ${
              currentPage == index ? "bg-gray-200" : "bg-gray-500"
            }`}
          ></li>
        ))}
    </ul>
  );
}

export default PageIndicator;
