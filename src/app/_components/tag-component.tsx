interface TagsComponentInterface {
  language: string;
}

export const TagsComponent = ({ language }: TagsComponentInterface) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full shadow-sm text-white text-xs font-semibold hover:scale-105 transition-transform duration-200 select-none">
      <span>#{language}</span>
    </div>
  );
};
