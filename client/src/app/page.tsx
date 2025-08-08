import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Contenido de ejemplo */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-foreground">
            Bienvenido a TECH LIQUOR STORE
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Encuentra los mejores licores, cigarrillos, snacks y bebidas con
            entrega a domicilio. Tu tienda tecnológica de confianza.
          </p>

          {/* Grid de categorías */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 text-4xl">🥃</div>
              <h3 className="text-lg font-semibold">Licores Premium</h3>
              <p className="text-sm text-muted-foreground">
                Whisky, Ron, Vodka y más
              </p>
            </div>
            <div className="rounded-lg border p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 text-4xl">🚬</div>
              <h3 className="text-lg font-semibold">Cigarrillos</h3>
              <p className="text-sm text-muted-foreground">
                Marcas reconocidas
              </p>
            </div>
            <div className="rounded-lg border p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 text-4xl">🍿</div>
              <h3 className="text-lg font-semibold">Snacks</h3>
              <p className="text-sm text-muted-foreground">
                Para acompañar tus momentos
              </p>
            </div>
            <div className="rounded-lg border p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 text-4xl">🥤</div>
              <h3 className="text-lg font-semibold">Bebidas</h3>
              <p className="text-sm text-muted-foreground">
                Cervezas, refrescos y más
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
