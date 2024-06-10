'use client'
import useCartStore from '@/stores/cart.store';
import React from 'react';

const ThankYouPage = () => {
  const { totalPrice, items } = useCartStore();

  const printInvoice = () => {
    const printContents = document.getElementById('invoice').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div className="thank-you-page flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Gracias por tu compra</h1>
        <div className="order-summary mb-4">
          <h2 className="text-xl font-semibold mb-3">Resumen del Pedido</h2>
          <ul className="list-disc space-y-2 pl-5">
            {items.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name} - Cantidad: {item.quantity}</span>
                <span>Total: ${item.price.toFixed(2)} Bs</span>
              </li>
            ))}
          </ul>
          <p className="text-lg font-medium mt-4">Total a pagar: ${totalPrice.toFixed(2)} Bs</p>
        </div>
        <div id="invoice" className="hidden">
          <div className="p-4 font-sans">
            <h2 className="text-lg font-semibold mb-2">Factura</h2>
            <ul>
              {items.map((item, index) => (
                <li key={index} className="flex justify-between my-1">
                  <span>{item.name}</span>
                  <span>Cantidad: {item.quantity}</span>
                  <span>Precio unitario: {item.price.toFixed(2)} Bs</span>
                  <span>Subtotal: {(item.price * item.quantity).toFixed(2)} Bs</span>
                </li>
              ))}
            </ul>
            <p className="text-lg mt-3">Total: {totalPrice.toFixed(2)} Bs</p>
            <p className="text-center mt-2">¡Gracias por tu compra!</p>
          </div>
        </div>
        <button
          onClick={printInvoice}
          className="mt-4 w-full bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition-colors"
        >
          Imprimir Factura
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
