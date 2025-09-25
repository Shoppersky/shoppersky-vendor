"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, DollarSign, MapPin, Mail, Phone } from "lucide-react";
import { InvoiceGenerator } from "@/components/invoice-generator";

// Mock data
const ordersMock = [
  {
    id: "ORD001",
    product: "Product A",
    sku: "SKU001",
    category: "Electronics",
    variant: "Red",
    amount: "$120",
    quantity: 2,
    date: "2024-01-10",
    status: "Delivered",
    image: "/placeholder.svg",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    shippingMethod: "FedEx",
    trackingNumber: "TRK123456",
    estimatedDelivery: "2024-01-15",
    shippingStatus: "Delivered",
    customerNotes: "Leave at front door",
  },
  {
    id: "ORD002",
    product: "Product B",
    sku: "SKU002",
    category: "Books",
    variant: "Paperback",
    amount: "$250",
    quantity: 1,
    date: "2024-02-15",
    status: "Pending",
    image: "/placeholder.svg",
    paymentMethod: "PayPal",
    paymentStatus: "Pending",
    shippingMethod: "DHL",
    trackingNumber: "TRK654321",
    estimatedDelivery: "2024-02-20",
    shippingStatus: "In Transit",
    customerNotes: "",
  },
];

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params.id;

  // Example customer info
  const customer = {
    id: customerId,
    name: "Sample Customer",
    email: "sample@example.com",
    phone: "+1 555 123 4567",
    address: "123 Main St, City, Country",
  };

  return (
    <div className="space-y-6 p-6">
      {/* Customer Info */}
      <Card className="backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border border-white/20 dark:border-zinc-800/50 shadow-lg rounded-2xl">
        <CardHeader>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {customer.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Customer ID: {customer.id}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4" /> {customer.email}
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Phone className="w-4 h-4" /> {customer.phone}
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4" /> {customer.address}
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline">
              Contact Customer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders */}
      {ordersMock.map((order) => (
        <Card
          key={order.id}
          className="backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border border-white/20 dark:border-zinc-800/50 shadow-lg rounded-2xl"
        >
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {order.product}
              </h2>
            </div>
            <span
              className={`text-sm font-medium ${
                order.status === "Delivered"
                  ? "text-green-600"
                  : order.status === "Pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {order.status}
            </span>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Product Info */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-32 h-32 flex-shrink-0 bg-gray-100 dark:bg-zinc-700 rounded-lg overflow-hidden">
                <img
                  src={order.image}
                  alt={order.product}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-1 text-gray-800 dark:text-gray-200">
                <p>
                  <span className="font-semibold">SKU:</span> {order.sku}
                </p>
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {order.category}
                </p>
                <p>
                  <span className="font-semibold">Variant:</span>{" "}
                  {order.variant}
                </p>
                <p>
                  <span className="font-semibold">Quantity:</span>{" "}
                  {order.quantity}
                </p>
                <p className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-500" />{" "}
                  <span className="font-semibold">{order.amount}</span>
                </p>
              </div>
            </div>

            {/* Shipping & Payment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-400">
              <div className="space-y-1">
                <p>
                  <span className="font-semibold">Order Date:</span>{" "}
                  {order.date}
                </p>
                <p>
                  <span className="font-semibold">Shipping Method:</span>{" "}
                  {order.shippingMethod}
                </p>
                <p>
                  <span className="font-semibold">Tracking Number:</span>{" "}
                  {order.trackingNumber}
                </p>
                <p>
                  <span className="font-semibold">Estimated Delivery:</span>{" "}
                  {order.estimatedDelivery}
                </p>
                <p>
                  <span className="font-semibold">Shipping Status:</span>{" "}
                  {order.shippingStatus}
                </p>
              </div>
              <div className="space-y-1">
                <p>
                  <span className="font-semibold">Payment Method:</span>{" "}
                  {order.paymentMethod}
                </p>
                <p>
                  <span className="font-semibold">Payment Status:</span>{" "}
                  {order.paymentStatus}
                </p>
                {order.customerNotes && (
                  <p>
                    <span className="font-semibold">Customer Notes:</span>{" "}
                    {order.customerNotes}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Button size="sm" variant="outline">
                Refund
              </Button>
              <Button size="sm" variant="outline">
                Cancel Order
              </Button>

              {/* Invoice Generator (Download + Print buttons) */}
              <InvoiceGenerator
                order={{
                  id: order.id,
                  customer: {
                    name: customer.name,
                    email: customer.email,
                    phone: customer.phone,
                  },
                  date: order.date,
                  status: order.status,
                  total: Number(order.amount.replace(/[^0-9.-]+/g, "")), // convert "$120" → 120
                  items: [
                    {
                      name: order.product,
                      quantity: order.quantity,
                      price:
                        Number(order.amount.replace(/[^0-9.-]+/g, "")) /
                        order.quantity,
                    },
                  ],
                }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
