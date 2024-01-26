import { FormatCurrencyId } from "../../lib/Currency/currency";
import Icon from "../Icon/icon";

const Card = ({
  iconColor,
  title,
  money,
  amountOfTransaction,
  color,
  bgColor,
}) => {
  const formattedMoney = FormatCurrencyId(money);

  return (
    <div className="md:w-1/2 w-2/6 shadow-xl rounded-lg bg-white py-10 px-12">
      <Icon iconColor={iconColor} bgColor={bgColor} title={title} />
      <p className="font-light text-md text-slate-700 my-3">{title}</p>
      <h3 className={`text-2xl font-bold ${color} mb-3`}>{formattedMoney},-</h3>
      <span className="text-md text-slate-600 font-light">
        <span className={`${color} font-bold text-lg`}>
          {amountOfTransaction}
        </span>{" "}
        Transaksi
      </span>
    </div>
  );
};

export default Card;
