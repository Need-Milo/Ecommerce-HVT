"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/lib/redux/store";
import { useEffect } from "react";
import AppInit from "@/components/AppInit";

export default function Providers({ children }: { children: React.ReactNode }) {


  return <Provider store={store}> 
  <AppInit/>
  {children}
  
  </Provider>;
}
