function OrderSummary({ name, quantity }) {
  return (
    <div className="flex justify-between py-1 w-full gap-8 text-md">
      <p>{name}</p>
      <p className="whitespace-nowrap">x {quantity}</p>
    </div>
  );
}

export default OrderSummary;
