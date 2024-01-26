import { PlusCircle, MinusCircle } from "phosphor-react";

const Button = ({ title, bgColor, onClick }) => {
  const buttonAdd = () => (
    <button
      className={`flex justify-center items-center ${bgColor} text-white rounded-lg w-1/8 py-1 px-10 gap-2 text-lg hover:bg-indigo-500`}
      onClick={onClick}
    >
      {title} <PlusCircle size={25} />
    </button>
  );

  const buttonMinus = () => (
    <button
      className={`flex justify-center items-center ${bgColor} text-white rounded-lg w-1/8 py-1 px-10 gap-2 text-lg hover:bg-red-500`}
      onClick={onClick}
    >
      {title} <MinusCircle size={25} />
    </button>
  );

  return title === "Pemasukan" ? buttonAdd() : buttonMinus();
};

export default Button;
