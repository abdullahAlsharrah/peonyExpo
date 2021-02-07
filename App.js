import { Text, View } from "native-base";
import React from "react";
import Accounting from "./components/Admin/Accounting";
import DailyInvoices from "./components/Admin/DailyInvoices";
import Invoices from "./components/Admin/Invoices";
import InvoicesByMonth from "./components/Admin/InvoicesByMonth";
import ServicesScreen from "./screens/ServicesScreen";

export default function App() {
  return <DailyInvoices />;
}
