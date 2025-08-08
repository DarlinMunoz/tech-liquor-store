"use client";

import * as React from "react";
import Link from "next/link";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { MdLocalBar, MdSmokingRooms } from "react-icons/md";
import { PiCookieFill } from "react-icons/pi";
import { IoWater } from "react-icons/io5";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

const categories = {
  liquors: {
    name: "Licores",
    icon: MdLocalBar,
    items: [
      { name: "Whisky", href: "/category/liquors/whisky" },
      { name: "Ron", href: "/category/liquors/rum" },
      { name: "Vodka", href: "/category/liquors/vodka" },
      { name: "Tequila", href: "/category/liquors/tequila" },
      { name: "Brandy", href: "/category/liquors/brandy" },
      { name: "Licores Dulces", href: "/category/liquors/sweet-liquors" },
    ],
  },
  cigarettes: {
    name: "Cigarrillos",
    icon: MdSmokingRooms,
    items: [
      { name: "Marlboro", href: "/category/cigarettes/marlboro" },
      { name: "Camel", href: "/category/cigarettes/camel" },
      { name: "Lucky Strike", href: "/category/cigarettes/lucky-strike" },
      { name: "Parliament", href: "/category/cigarettes/parliament" },
      { name: "Accesorios", href: "/category/cigarettes/accessories" },
    ],
  },
  snacks: {
    name: "Snacks",
    icon: PiCookieFill,
    items: [
      { name: "Papas Fritas", href: "/category/snacks/chips" },
      { name: "Galletas", href: "/category/snacks/cookies" },
      { name: "Chocolates", href: "/category/snacks/chocolates" },
      { name: "Frutos Secos", href: "/category/snacks/nuts" },
      { name: "Dulces", href: "/category/snacks/candies" },
    ],
  },
  beverages: {
    name: "Bebidas",
    icon: IoWater,
    items: [
      { name: "Cervezas", href: "/category/beverages/beers" },
      { name: "Refrescos", href: "/category/beverages/sodas" },
      { name: "Jugos", href: "/category/beverages/juices" },
      { name: "Agua", href: "/category/beverages/water" },
      { name: "Energizantes", href: "/category/beverages/energy-drinks" },
    ],
  },
};

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [expandedCategories, setExpandedCategories] = React.useState<
    Set<string>
  >(new Set());
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const toggleCategory = (categoryKey: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryKey)) {
      newExpanded.delete(categoryKey);
    } else {
      newExpanded.add(categoryKey);
    }
    setExpandedCategories(newExpanded);
  };

  // Función de búsqueda simple
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Aquí puedes redirigir a una página de resultados
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };
  const cartItemsCount = 3; // Esto vendría de tu estado global del carrito

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <MdLocalBar className="h-8 w-8 text-amber-600" />
            <span className="text-xl font-bold text-foreground">
              TECH LIQUOR STORE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-6 md:flex">
            {Object.entries(categories).map(([key, category]) => {
              const IconComponent = category.icon;
              return (
                <DropdownMenu key={key}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-1"
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{category.name}</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <Link href={`/category/${key}`}>
                      <DropdownMenuItem className="font-medium">
                        Ver todos los {category.name.toLowerCase()}
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    {category.items.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <DropdownMenuItem>{item.name}</DropdownMenuItem>
                      </Link>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop only */}
            <div className="hidden lg:block">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1/2 h-7 -translate-y-1/2 px-2"
                >
                  Buscar
                </Button>
              </form>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <FiUser className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/auth/login">Iniciar Sesión</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/auth/register">Registrarse</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/account">Mi Cuenta</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/orders">Mis Pedidos</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <FiShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <FiMenu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <MdLocalBar className="h-6 w-6 text-amber-600" />
                    <span>TECH LIQUOR STORE</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-4">
                  {/* Search - Mobile */}
                  <form onSubmit={handleSearch} className="space-y-2">
                    <input
                      type="text"
                      placeholder="Buscar productos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!searchQuery.trim()}
                    >
                      Buscar
                    </Button>
                  </form>

                  {/* Categories - Mobile */}
                  <div className="space-y-2">
                    {Object.entries(categories).map(([key, category]) => {
                      const IconComponent = category.icon;
                      const isExpanded = expandedCategories.has(key);
                      return (
                        <div key={key} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Link
                              href={`/category/${key}`}
                              onClick={() => setIsOpen(false)}
                              className="flex flex-1 items-center space-x-2 rounded-md p-2 hover:bg-accent"
                            >
                              <IconComponent className="h-5 w-5" />
                              <span className="font-medium">
                                {category.name}
                              </span>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleCategory(key)}
                              className="h-8 w-8 p-1"
                            >
                              <ChevronDown
                                className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                              />
                            </Button>
                          </div>
                          {isExpanded && (
                            <div className="ml-7 space-y-1">
                              {category.items.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block rounded-md p-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* User actions - Mobile */}
                  <div className="space-y-2 border-t pt-4">
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <FiUser className="mr-2 h-4 w-4" />
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link href="/account" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        Mi Cuenta
                      </Button>
                    </Link>
                    <Link href="/orders" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        Mis Pedidos
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
