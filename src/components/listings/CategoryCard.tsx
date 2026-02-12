import clsx from "clsx";
import { IconType } from "react-icons";

interface CategoryCardProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: () => void;
}

const CategoryCard = ({
  label,
  icon: Icon,
  selected,
  onClick,
}: CategoryCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        `my-6 flex flex-col gap-3 p-4 border rounded-xl text-left transition text-gray-700 hover:border-black cursor-pointer`,
        selected ? "border-black bg-gray-50" : "border-gray-200",
      )}
    >
      <Icon size={28} />
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default CategoryCard;
