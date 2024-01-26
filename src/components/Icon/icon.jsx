import { Wallet, ShoppingBagOpen } from "phosphor-react";

const Icon = ({ bgColor, iconColor, title }) => {
  return (
    <div className={`rounded-md ${bgColor} w-fit p-1`}>
      {title == "Pemasukan Kamu" ? (
        <Wallet size={32} color={iconColor} />
      ) : (
        <ShoppingBagOpen size={32} color={iconColor} />
      )}
    </div>
  );
};

export default Icon;
