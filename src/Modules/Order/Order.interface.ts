interface Order extends Document {
  email: string;
  productId: string;
  price: number;
  quantity: number;
}

export default Order;
