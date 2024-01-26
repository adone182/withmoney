import { useEffect, useState } from "react";
import Button from "./components/Button/button";
import Card from "./components/Card/card";
import Icon from "./components/Icon/icon";
import Modal from "./components/layouts/Modal/modal";
import { FormatCurrencyId } from "./lib/Currency/currency";
import { FormatDate } from "./lib/Date/date";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [submittedData, setSubmittedData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("userData")) || [];
    setSubmittedData(existingData);

    let totalIncomeAmount = 0;
    let totalExpenseAmount = 0;

    existingData.forEach((item) => {
      if (item.type === "Pemasukan") {
        totalIncomeAmount += parseInt(item.nominal);
      } else {
        totalExpenseAmount += parseInt(item.nominal);
      }
    });
    setTotalIncome(totalIncomeAmount);
    setTotalExpense(totalExpenseAmount);
    setRemainingAmount(totalIncomeAmount - totalExpenseAmount);
  }, [submittedData]);

  const handleButtonClick = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (formData) => {
    const newData = [...submittedData, formData];
    setSubmittedData(newData);
    localStorage.setItem("userData", JSON.stringify(newData));
  };

  return (
    <div className="w-full px-72 py-16">
      <h1 className="text-3xl font-bold text-indigo-600 text-center py-5">
        MONEY MANAGEMENT APP
      </h1>
      <hr className="mx-auto my-2 w-1/4" />

      <div className="text-center">
        <h2 className="font-bold text-slate-700 text-3xl my-5">
          {FormatCurrencyId(remainingAmount)},-
        </h2>
        <span className="font-reguler text-slate-400">
          Uang kamu tersisa{" "}
          <span className="text-slate-500 font-medium text-md">
            {totalIncome !== 0
              ? ((remainingAmount / totalIncome) * 100).toFixed(2)
              : 0}
            %
          </span>{" "}
          lagi
        </span>
      </div>

      <div className="flex justify-between items-center gap-12 my-10">
        <Card
          iconColor="#0d6efd"
          bgColor="bg-indigo-200"
          color="text-blue-500"
          title="Pemasukan Kamu"
          money={totalIncome}
          amountOfTransaction={
            submittedData.filter((item) => item.type === "Pemasukan").length
          }
        />
        <Card
          iconColor="#dc3545"
          bgColor="bg-red-200"
          color="text-red-500"
          title="Pengeluaran Kamu"
          money={totalExpense}
          amountOfTransaction={
            submittedData.filter((item) => item.type === "Pengeluaran").length
          }
        />
      </div>

      <div className="flex justify-between items-center gap-3 my-10">
        <h2 className="text-2xl text-[#3c3dbf] fonts-semibold basis-3/4">
          Ringkasan Transaksi
        </h2>
        <Button
          title="Pemasukan"
          bgColor="bg-[#3c3dbf]"
          onClick={() => handleButtonClick("Pemasukan")}
        />
        <Button
          title="Pengeluaran"
          bgColor="bg-[#ff3666]"
          onClick={() => handleButtonClick("Pengeluaran")}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          modalType={modalType}
          onSubmit={handleSubmit}
        />
      </div>

      {submittedData.length > 0 ? (
        submittedData.map((result, index) => (
          <div
            className="flex justify-start items-center gap-3 my-10"
            key={index}
          >
            <div className="basis-1/4">
              <Icon
                title={
                  result.type === "Pemasukan"
                    ? "Pemasukan Kamu"
                    : "Pengeluaran Kamu"
                }
                iconColor={result.type === "Pemasukan" ? "#0d6efd" : "#dc3545"}
                bgColor={
                  result.type === "Pemasukan" ? "bg-indigo-200" : "bg-red-200"
                }
              />
            </div>

            <div className="basis-2/3">
              <p
                className={`text-xl font-medium ${
                  result.type === "Pemasukan"
                    ? "text-[#3c3dbf]"
                    : "text-[#ff3666]"
                }`}
              >
                {result.description}
              </p>
              <span className="text-md font-light">
                {FormatDate(result.date)}
              </span>
            </div>
            <div className="basis-1/4">
              <h4
                className={`text-xl text-end font-bold ${
                  result.type === "Pemasukan"
                    ? "text-[#3c3dbf]"
                    : "text-[#ff3666]"
                }`}
              >
                {FormatCurrencyId(result.nominal)},-
              </h4>
            </div>
          </div>
        ))
      ) : (
        <h3 className="text-xl font-regular text-center text-red-500 py-10">
          Oooppsss...Belom Ada Transaksi nih!{" "}
        </h3>
      )}
    </div>
  );
};

export default App;
