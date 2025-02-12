const OrderManagement = () => {
    const [orders, setOrders] = useState([
      { id: 1, customer: "Arjun", status: "Pending" },
      { id: 2, customer: "Sita", status: "Delivered" },
    ]);
  
    const updateStatus = (id, newStatus) => {
      setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
    };
  
    return (
      <div>
        <h2>🛒 Manage Orders</h2>
        {orders.map(order => (
          <div key={order.id}>
            <span>{order.customer} - {order.status}</span>
            <button onClick={() => updateStatus(order.id, "Delivered")}>Mark as Delivered</button>
          </div>
        ))}
      </div>
    );
  };
  