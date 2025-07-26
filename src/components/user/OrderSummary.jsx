function OrderSummary({ name, quantity }) {
  return (
    <div className="flex justify-between py-2 w-full gap-8 text-sm">
      <p>{name}</p>
      <p className="whitespace-nowrap">x {quantity}</p>
    </div>
  );
}

export default OrderSummary;
