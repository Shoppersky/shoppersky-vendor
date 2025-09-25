"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface InvoiceGeneratorProps {
  order: {
    id: string
    customer: {
      name: string
      email: string
      phone: string
      address?: string
      suburb?: string
      state?: string
      postcode?: string
    }
    date: string
    status: string
    total: number
    items: Array<{
      name: string
      quantity: number
      price: number
    }>
  }
}

export function InvoiceGenerator({ order }: InvoiceGeneratorProps) {
  const generateInvoiceHTML = () => {
    const invoiceDate = new Date().toLocaleDateString("en-AU")
    const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-AU")

    const gst = order.total * 0.1
    const totalWithGST = order.total + gst

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice ${order.id}</title>
        <style>
          @page { size: A4; margin: 20mm; }
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333; }
          .invoice-container { width: 210mm; min-height: 297mm; padding: 20mm; margin: auto; background: #fff; box-sizing: border-box; border: 1px solid #ddd; }
          .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .company { line-height: 1.4; }
          .company h1 { margin: 0; color: #0b3d91; }
          .company p { margin: 2px 0; color: #555; font-size: 12pt; }
          .invoice-title { text-align: right; }
          .invoice-title h2 { margin: 0; color: #0b3d91; font-size: 24pt; }
          .billing { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 12pt; }
          .billing div { line-height: 1.5; }
          table.items { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12pt; }
          table.items th, table.items td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          table.items th { background: #f0f0f0; color: #0b3d91; font-weight: bold; }
          .total-section { float: right; width: 300px; font-size: 12pt; }
          .total-section div { display: flex; justify-content: space-between; margin: 5px 0; }
          .grand-total { font-size: 14pt; font-weight: bold; color: #0b3d91; border-top: 2px solid #0b3d91; padding-top: 10px; margin-top: 10px; }
          .footer { clear: both; text-align: center; margin-top: 50px; font-size: 10pt; color: #666; }
          @media print { body { background: #fff; } .invoice-container { border: none; } }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="header">
            <div class="company">
              <h1>Your Company Pty Ltd</h1>
              <p>123 Business St</p>
              <p>Sydney NSW 2000</p>
              <p>Phone: (02) 1234 5678</p>
              <p>Email: info@yourcompany.com</p>
              <p>ABN: 12 345 678 901</p>
            </div>
            <div class="invoice-title">
              <h2>INVOICE</h2>
              <p><strong>Invoice #:</strong> ${order.id}</p>
              <p><strong>Date:</strong> ${invoiceDate}</p>
              <p><strong>Due Date:</strong> ${dueDate}</p>
            </div>
          </div>

          <div class="billing">
            <div>
              <h3>Bill To:</h3>
              <p><strong>${order.customer.name}</strong></p>
              ${order.customer.address ? `<p>${order.customer.address}</p>` : ""}
              ${order.customer.suburb && order.customer.state && order.customer.postcode ? `<p>${order.customer.suburb} ${order.customer.state} ${order.customer.postcode}</p>` : ""}
              <p>${order.customer.email}</p>
              <p>${order.customer.phone}</p>
            </div>
            <div>
              <h3>Order Details:</h3>
              <p><strong>Status:</strong> ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
              <p><strong>Payment Terms:</strong> 30 days</p>
            </div>
          </div>

          <table class="items">
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price (AUD)</th>
                <th>Total (AUD)</th>
              </tr>
            </thead>
            <tbody>
              ${order.items
                .map(
                  (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price.toFixed(2)}</td>
                  <td>$${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>

          <div class="total-section">
            <div><span>Subtotal:</span> <span>$${order.total.toFixed(2)}</span></div>
            <div><span>GST (10%):</span> <span>$${gst.toFixed(2)}</span></div>
            <div class="grand-total"><span>Total:</span> <span>$${totalWithGST.toFixed(2)}</span></div>
          </div>

          <div class="footer">
            <p>Thank you for your business!</p>
            <p>Please make payment to Your Company Pty Ltd within 30 days.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  const downloadInvoice = () => {
    const invoiceHTML = generateInvoiceHTML()
    const blob = new Blob([invoiceHTML], { type: "text/html" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `invoice-${order.id}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      <Button onClick={downloadInvoice} variant="outline">
        <Download className="h-4 w-4 mr-2" />
        Download Invoice
      </Button>
    </div>
  )
}
