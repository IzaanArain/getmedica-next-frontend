import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

interface BackButtonProps {
  text: string;
  link: string;
}

const BackButton = ({ text, link }: BackButtonProps) => {
  return (
    <Link
      href={link}
      className="text-gray-500 hover:underline flex 
      items-center gap-1 font-bold"
    >
      <ArrowLeftCircle size={18} />
      <span>{text}</span>
    </Link>
  );
};

export default BackButton;
