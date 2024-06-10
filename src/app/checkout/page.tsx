"use client";
import React, { useEffect, useState } from "react";
import useCartStore from "@/stores/cart.store";
import { randomUUID } from "crypto";
import { useRouter } from "next/navigation";

const Header = () => (
  <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
    <a href="#" className="text-2xl font-bold text-gray-800">Drones</a>
    <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
      <Breadcrumbs />
    </div>
  </div>
);

const Breadcrumbs = () => (
  <div className="relative">
    <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
      <BreadcrumbItem step="1" label="Carrito" isCompleted />
      <BreadcrumbSeparator />
      <BreadcrumbItem step="2" label="Envio" isCurrent />
      <BreadcrumbSeparator />
      <BreadcrumbItem step="3" label="Pago" />
    </ul>
  </div>
);

const BreadcrumbItem = ({ step, label, isCompleted, isCurrent }) => (
  <li className="flex items-center space-x-3 text-left sm:space-x-4">
    <a
      className={`flex h-6 w-6 items-center justify-center rounded-full ${isCompleted ? "bg-emerald-200 text-emerald-700" : isCurrent ? "bg-gray-600 text-white ring ring-gray-600 ring-offset-2" : "bg-gray-400 text-white"} text-xs font-semibold`}
      href="#"
    >
      {isCompleted ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        step
      )}
    </a>
    <span className={`font-semibold ${isCurrent ? "text-gray-900" : "text-gray-500"}`}>{label}</span>
  </li>
);

const BreadcrumbSeparator = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const OrderSummary = ({ items, removeItem }) => (
  <div className="px-4 pt-8">
    <p className="text-xl font-medium">Resumen de Orden</p>
    <p className="text-gray-400">Estos son los drones que añadiste al carrito</p>
    <div className="mt-8 flow-root">
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {items.map((product) => (
          <li key={product.id} className="flex py-6 border-gray-300">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover object-center" />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>{product.name}</h3>
                <p className="ml-4">{product.price} Bs</p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">Cantidad: {product.quantity}</p>
                <div className="flex">
                  <button onClick={() => removeItem(product.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Borrar</button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    <ShippingMethod />
  </div>
);

const ShippingMethod = () => (
  <>
    <p className="mt-8 text-lg font-medium">Método de Envío</p>
    <form className="mt-5 grid gap-6">
      <ShippingOption id="radio_1" label="Delivery Normal" description="Delivery: 2-4 Dias" imageSrc="/images/naorrAeygcJzX0SyNI4Y0.png" />
      <ShippingOption id="radio_2" label="Delivery Express" description="Delivery: 1-2 Dias" imageSrc="/images/oG8xsl3xsOkwkMsrLGKM4.png" />
    </form>
  </>
);

const ShippingOption = ({ id, label, description, imageSrc }) => (
  <div className="relative">
    <input className="peer hidden" id={id} type="radio" name="radio" defaultChecked />
    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
    <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor={id}>
      <img className="w-14 object-contain" src={imageSrc} alt="" />
      <div className="ml-5">
        <span className="mt-2 font-semibold">{label}</span>
        <p className="text-slate-500 text-sm leading-6">{description}</p>
      </div>
    </label>
  </div>
);

const PaymentDetails = ({ totalPrice, setPaymentMethod, handleProceedToPayment }) => (
  <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
    <p className="text-xl font-medium">Detalle de Pago</p>
    <p className="text-gray-400">Completa tu orden con los datos de pago</p>
    <PaymentMethod setPaymentMethod={setPaymentMethod} />
    <OrderSummaryFooter totalPrice={totalPrice} />
    <button className="mt-4 mb-8 w-full rounded-md bg-black px-6 py-3 font-medium text-white" onClick={handleProceedToPayment}>
      Proceder a Pago
    </button>
  </div>
);

const PaymentMethod = ({ setPaymentMethod }) => (
  <div className="mt-4">
    <p className="mb-2 text-sm font-medium">Selecciona un método de pago</p>
    <div className="flex space-x-4">
      <PaymentOption value="qr" label="QR Code" setPaymentMethod={setPaymentMethod} />
      <PaymentOption value="card" label="Tarjeta de Crédito/Débito" setPaymentMethod={setPaymentMethod} />
    </div>
  </div>
);

const PaymentOption = ({ value, label, setPaymentMethod }) => (
  <label className="flex items-center space-x-2">
    <input
      type="radio"
      name="payment-method"
      value={value}
      className="form-radio h-4 w-4 text-blue-500"
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    <span className="text-sm">{label}</span>
  </label>
);

const OrderSummaryFooter = ({ totalPrice }) => (
  <>
    <div className="mt-6 border-t border-b py-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Subtotal</p>
        <p className="font-semibold text-gray-900">Bs {totalPrice}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Envío</p>
        <p className="font-semibold text-gray-900">Bs 30.00</p>
      </div>
    </div>
    <div className="mt-6 flex items-center justify-between">
      <p className="text-sm font-medium text-gray-900">Total</p>
      <p className="text-2xl font-semibold text-gray-900">Bs {totalPrice + 30}</p>
    </div>
  </>
);

const PaymentDetailsCard  = ({onClickPay}) => (
  <div>
    <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
    <div className="relative">
      <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
      <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
        </svg>
      </div>
    </div>
    <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Card Holder</label>
    <div className="relative">
      <input type="text" id="card-holder" name="card-holder" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
      <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
        </svg>
      </div>
    </div>
    <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">Card Details</label>
    <div className="flex">
      <div className="relative w-7/12 flex-shrink-0">
        <input type="text" id="card-no" name="card-no" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="xxxx-xxxx-xxxx-xxxx" />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
          </svg>
        </div>
      </div>
      <input type="text" name="credit-expiry" className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="MM/YY" />
      <input type="text" name="credit-cvc" className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="CVC" />
    </div>
    <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
    <div className="flex flex-col sm:flex-row">
      <div className="relative flex-shrink-0 sm:w-7/12">
        <input type="text" id="billing-address" name="billing-address" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg" alt="" />
        </div>
      </div>
      <select type="text" name="billing-state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
        <option value="State">State</option>
      </select>
      <input type="text" name="billing-zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" />
    </div>

    <button className="mt-4 mb-8 w-full rounded-md bg-black px-6 py-3 font-medium text-white" onClick={onClickPay}>
      Pagar
    </button>
  </div>
);

const QRCodeComponent = () => {
    const [qrImage, setQrImage] = useState(null);
    const { items } = useCartStore();

    function generateDateBasedId(): string {
        const datePart = new Date().toISOString().replace(/[-:.TZ]/g, '');
        const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `${datePart}-${randomPart}`;
      }
  
    useEffect(() => {
      const generateQrCode = async () => {
        const taPedidoDetalle = items.map((item, index) => ({
          Serial: `serial-${index}`,
          Producto: item.name,
          Cantidad: item.quantity,
          Precio: item.price,
          Descuento: 0,
          Total: item.price * item.quantity
        }));
  
        const response = await fetch('https://serviciostigomoney.pagofacil.com.bo/api/servicio/generarqrv2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            TokenSecret: '9E7BC239DDC04F83B49FFDA5',
            TokenService: '51247fae280c20410824977b0781453df59fad5b23bf2a0d14e884482f91e09078dbe5966e0b970ba696ec4caf9aa5661802935f86717c481f1670e63f35d5041c31d7cc6124be82afedc4fe926b806755efe678917468e31593a5f427c79cdf016b686fca0cb58eb145cf524f62088b57c6987b3bb3f30c2082b640d7c52907',
            CommerceId: 'd029fa3a95e174a19934857f535eb9427d967218a36ea014b70ad704bc6c8d1c'
          },
          body: JSON.stringify({
            tcCommerceID: "d029fa3a95e174a19934857f535eb9427d967218a36ea014b70ad704bc6c8d1c",
            tnMoneda: "1",
            tnTelefono: "75002909",
            tcCorreo: "alejandromontero1551@gmail.com",
            tcNombreUsuario: "alm1",
            tnCiNit: "8905881",
            tcNroPago: `Grupo5-${generateDateBasedId()}`,
            tnMontoClienteEmpresa: items.reduce((total, item) => total + item.price * item.quantity, 0)+30,
            tcUrlCallBack: "https://us-central1-tienda-fa7e8.cloudfunctions.net/paymentCallback",
            tcUrlReturn: "",
            taPedidoDetalle
          })
        });
        const data = await response.json();
        const responsee = data.values as string
        const split = responsee.split(";");
        const object = split[1]
        const data2 = JSON.parse(object)
        console.log('object', data2.qrImage);

        setQrImage(data2.qrImage);
      };
  
      generateQrCode();
    }, []);
  
    return (
      <div className="flex justify-center items-center mt-10">
        {qrImage ? (
          <img src={`data:image/png;base64,${qrImage}`} alt="QR Code" className="h-90 w-90" />
        ) : (
          <p>Generating QR Code...</p>
        )}
      </div>
    );
};

const PrintInvoice = ({ items, totalPrice }) => {
  const printInvoice = () => {
    const printContents = document.getElementById('invoice').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div>
      <div id="invoice" style={{ display: 'none' }}>
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
          <h2 style={{ borderBottom: '2px solid #000', paddingBottom: '10px' }}>Factura</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {items.map((item, index) => (
              <li key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                <span>{item.name}</span>
                <span style={{ float: 'right' }}>Cantidad: {item.quantity}</span>
                <br />
                <span>Precio: ${item.price.toFixed(2)}</span>
                <span style={{ float: 'right' }}>Total: ${(item.price * item.quantity).toFixed(2)} Bs</span>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: '20px', fontSize: '18px' }}>Precio Total: ${totalPrice.toFixed(2)}</p>
          <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '18px', fontWeight: 'bold' }}>Gracias por tu compra!</p>
        </div>
      </div>
      <button onClick={printInvoice} className="mt-4 p-2 bg-blue-500 text-white rounded">Imprir factura</button>
    </div>
  );
};

  
function Page() {
  const { isOpen, toggleCart, totalPrice, items, removeItem, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showDetail, setShowDetail] = useState(true)
  const [showInvoice, setShowInvoice] = useState(false);
  const router = useRouter()

  const handleProceedToPayment = () => {
    setShowPaymentDetails(true);
  };

  return (
    <div>
      <Header />
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        { !showInvoice && (
          <OrderSummary items={items} removeItem={removeItem} />
        )}
        {showPaymentDetails && (
          paymentMethod === "card" ? (
            <PaymentDetailsCard onClickPay={() => {
              router.push('/thakyou')
            }} />
          ) : (
            <>
              <QRCodeComponent />
              <PrintInvoice items={items} totalPrice={totalPrice} />
            </>
          )
        )}
        
        {!showPaymentDetails && showDetail && (
          <PaymentDetails totalPrice={totalPrice} setPaymentMethod={setPaymentMethod} handleProceedToPayment={handleProceedToPayment} />
        )}

        {showInvoice && (
          <PrintInvoice items={items} totalPrice={totalPrice} />
        )}
      </div>
    </div>
  );
}

export default Page