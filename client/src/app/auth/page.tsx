"use client";

import { DataContext } from "@/context/DataContext"
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";

export default function AuthPage() {

  const { setUser } = useContext(DataContext);

  useEffect(() => {
    setUser("Darlin Muñoz");
  }, [])
  

  return (
    <div>
      <button onClick={() => redirect("/auth/profile")}>
        Click me
      </button>
    </div>
  )
}
