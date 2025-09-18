import React from 'react';
import { Package, User, MapPin, Eye } from 'lucide-react';
import { Order } from '../types/orders';

interface OrdersTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders, onViewDetails }) => {
  if (orders?.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
        <p className="text-gray-500">No orders match your current search criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivery Address
              </th> */}
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders?.map((order) => (
              <tr key={order.order_id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {order.order_id}
                      </div>
                     
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    
                    <div className="ml-3">
                   
                      <div className="text-sm text-gray-900 font-medium">{order.username}</div>
                      <div className="text-sm text-gray-500">{order.address.details.email}</div>
                      
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    {Object.entries(order.item_details).map(([itemId, item]) => (
                      <div key={itemId} className="text-sm">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-gray-500">
                         Qty: {item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-lg font-bold text-gray-900">
                    ${order.amount.toLocaleString('en-AU', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-gray-500">AUD</div>
                </td>
                {/* <td className="px-6 py-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm text-gray-900">
                        {order.address.details.apartment && `${order.address.details.apartment}, `}
                        {order.address.details.street}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.address.details.city}, {order.address.details.state} {order.address.details.postcode}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.address.details.country}
                      </div>
                      {order.address.is_default && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                          Default Address
                        </span>
                      )}
                      <div className="text-xs text-gray-400 mt-1">
                        Label: {order.address.label}
                      </div>
                    </div>
                  </div>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.order_status == 'PENDING' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800"> 
               
                      {order.order_status}
                      </span>
                  )}
                  {order.order_status == 'SHIPPED' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {order.order_status}
                    </span>
                  )}
                  {order.order_status == 'DELIVERED' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      {order.order_status}
                    </span>
                  )}
                  {order.order_status == 'CANCELLED' && (

                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      {order.order_status}
                    </span>
                  )}
                  {
                    order.order_status==='CONFIRMED' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                      {order.order_status}
                    </span>
                    )
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => onViewDetails(order)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};