import React from 'react';
import { ArrowLeft, Package, User, MapPin, Calendar, DollarSign, Phone, Mail, Home } from 'lucide-react';
import { Order } from '../types/orders';

interface OrderDetailsProps {
  order: Order;
  onBack: () => void;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onBack }) => {
  const totalItems = Object.values(order.item_details).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors duration-150"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Orders
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
              <p className="text-gray-600 mt-1">Order ID: {order.order_id}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                ${order.amount.toLocaleString('en-AU', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-gray-500">Total Amount (AUD)</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Package className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Order ID</label>
                  <p className="text-lg font-mono text-gray-900">{order.order_id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">User ID</label>
                  <p className="text-lg font-mono text-gray-900">{order.user_id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Items</label>
                  <p className="text-lg font-semibold text-gray-900">{totalItems}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Username</label>
                  <p className="text-lg text-gray-900">@{order.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Order Status</label>
                  <p className="text-lg text-gray-900 flex items-center">
                    {order.order_status}
                  </p>
                </div>
              </div>
            </div>

            {/* Items Ordered */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Package className="w-6 h-6 text-purple-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Items Ordered</h2>
              </div>
              <div className="space-y-4">
                {Object.entries(order.item_details).map(([itemId, item]) => (
                  <div key={itemId} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{item.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Item ID: {itemId}
                          </span>
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            Quantity: {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          Qty: {item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-red-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
                {order.address.is_default && (
                  <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Default Address
                  </span>
                )}
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Address Label</label>
                    <p className="text-gray-900 capitalize flex items-center">
                      <Home className="w-4 h-4 mr-2 text-gray-400" />
                      {order.address.label}
                    </p>
                  </div>
           
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-500">Full Address</label>
                  <div className="mt-1 text-gray-900">
                    {order.address.details.apartment && (
                      <p>{order.address.details.apartment}, {order.address.details.street}</p>
                    )}
                    {!order.address.details.apartment && (
                      <p>{order.address.details.street}</p>
                    )}
                    <p>{order.address.details.city}, {order.address.details.state} {order.address.details.postcode}</p>
                    <p>{order.address.details.country}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <User className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Customer</h2>
              </div>
              <div className="space-y-4">
                <div className="text-center pb-4 border-b border-gray-200">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {order.address.details.first_name} {order.address.details.last_name}
                  </h3>
                  <p className="text-gray-500">@{order.username}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-900">{order.address.details.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-gray-900">{order.address.details.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Statistics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <DollarSign className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Order Stats</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-semibold text-gray-900">
                    ${order.amount.toLocaleString('en-AU', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Items</span>
                  <span className="font-semibold text-gray-900">{totalItems}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Unique Products</span>
                  <span className="font-semibold text-gray-900">{Object.keys(order.item_details).length}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Currency</span>
                  <span className="font-semibold text-gray-900">AUD</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-150">
                  Update Order Status
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-150">
                  Contact Customer
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                  Print Order
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};