interface TagsComponentInterface {
  language: string;
}

export const TagsComponent = ({ language }: TagsComponentInterface) => {
  return (
    <span className="inline-flex items-center px-3 py-1 bg-secondary/10 text-secondary text-[11px] font-semibold rounded-lg hover:bg-secondary hover:text-white hover:scale-105 transition-all duration-300 select-none">
      {language}
    </span>
  );
};
