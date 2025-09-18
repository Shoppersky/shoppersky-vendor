import React from 'react';
import { DollarSign, Package, ShoppingBag, Users } from 'lucide-react';
import { Order } from '../types/orders';

interface OrdersStatsProps {
  orders: Order[];
}

export const OrdersStats: React.FC<OrdersStatsProps> = ({ orders }) => {
  const totalRevenue = orders?.reduce((sum, order) => sum + order.amount, 0);
  const totalOrders = orders?.length;
  const totalItems = orders?.reduce((sum, order) => 
    sum + Object.values(order.item_details).reduce((itemSum, item) => itemSum + item.quantity, 0), 0
  );
  const uniqueCustomers = new Set(orders?.map(order => order.user_id)).size;

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue?.toLocaleString('en-AU', { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Orders',
      value: totalOrders?.toString(),
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Items Sold',
      value: totalItems?.toString(),
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Customers',
      value: uniqueCustomers?.toString(),
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className={`${stat.bgColor} p-3 rounded-lg`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};