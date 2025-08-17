"use client";

import { DataContext } from "@/context/DataContext"
import { useContext } from "react"

export default function ProfilePage() {

  const { user } = useContext(DataContext);
  return (
    <div>Bienvenido {user}</div>
  )
}

