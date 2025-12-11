import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="container mx-auto p-4 mt-[5rem]">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h2>
          <Link 
            to="/profile" 
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Profile
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error?.data?.error || error.error || "Failed to load orders"}
          </Message>
        ) : !orders || orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No Orders Yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't placed any orders yet. Start shopping to see your orders here!</p>
            <Link 
              to="/shop" 
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-2 font-semibold text-gray-900 dark:text-white">Product</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-900 dark:text-white">Order ID</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-900 dark:text-white">Date</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-900 dark:text-white">Total</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-900 dark:text-white">Payment</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-900 dark:text-white">Delivery</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-900 dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <img
                          src={order.orderItems[0]?.image}
                          alt={order.orderItems[0]?.name || "Product"}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/64x64/f0f0f0/666666?text=No+Image";
                          }}
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {order.orderItems[0]?.name || "Product"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {order.orderItems.length > 1 && `+${order.orderItems.length - 1} more items`}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-sm font-mono text-gray-600 dark:text-gray-300">
                        #{order._id.slice(-8)}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-gray-900 dark:text-white">
                        {new Date(order.createdAt).toLocaleDateString('en-IN')}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {order.totalPrice?.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        order.isPaid 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}>
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        order.isDelivered 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}>
                        {order.isDelivered ? "Delivered" : "Processing"}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <Link to={`/order/${order._id}`}>
                        <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                          View Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrder;
