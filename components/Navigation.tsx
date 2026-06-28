"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, User, Heart, Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const { totalQuantity } = useCart();
  const { wishlist } = useWishlist();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.elements.namedItem("q") as HTMLInputElement)?.value.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-xs md:text-sm py-2 text-center font-medium tracking-wide">
        🚚 Free Shipping Across India • 💳 COD Available • ⭐ Trusted by 10,000+ Customers
      </div>

      {/* Sticky Navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b",
          scrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-border shadow-sm py-2"
            : "bg-background border-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            
            {/* Mobile Menu & Logo */}
            <div className="flex items-center gap-4 lg:hidden">
              <Sheet>
                <SheetTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "shrink-0" })}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="text-left font-bold text-2xl">SmartCart</SheetTitle>
                  </SheetHeader>
                  <div className="grid gap-6 py-8">
                    <Link href="/categories/all" className="text-lg font-semibold hover:text-primary transition-colors">Shop All</Link>
                    <Link href="/categories/electronics" className="text-lg font-semibold hover:text-primary transition-colors">Electronics</Link>
                    <Link href="/categories/wearables" className="text-lg font-semibold hover:text-primary transition-colors">Wearables</Link>
                    <Link href="/about" className="text-lg font-semibold hover:text-primary transition-colors">About Us</Link>
                    <Link href="/contact" className="text-lg font-semibold hover:text-primary transition-colors">Contact</Link>
                    <div className="pt-6 border-t">
                      <form onSubmit={handleSearch} className="flex gap-2">
                        <Input name="q" placeholder="Search..." className="h-12 bg-secondary" />
                        <Button type="submit" size="lg">Go</Button>
                      </form>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Link href="/" className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-foreground">SmartCart</span>
              </Link>
            </div>

            {/* Desktop Logo & Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              <Link href="/" className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tighter text-foreground">
                  SmartCart<span className="text-primary">.</span>
                </span>
              </Link>
              <nav className="flex items-center gap-8 text-sm font-semibold text-muted-foreground">
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:text-foreground outline-none transition-colors">
                    Shop Categories
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 p-2 rounded-xl shadow-lg border-border">
                    <DropdownMenuItem className="p-3 cursor-pointer rounded-lg hover:bg-secondary"><Link href="/categories/all" className="w-full font-medium">All Products</Link></DropdownMenuItem>
                    <DropdownMenuItem className="p-3 cursor-pointer rounded-lg hover:bg-secondary"><Link href="/categories/electronics" className="w-full font-medium">Electronics</Link></DropdownMenuItem>
                    <DropdownMenuItem className="p-3 cursor-pointer rounded-lg hover:bg-secondary"><Link href="/categories/wearables" className="w-full font-medium">Wearables</Link></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/categories/new-arrivals" className="hover:text-foreground transition-colors">New Arrivals</Link>
                <Link href="/about" className="hover:text-foreground transition-colors">Our Story</Link>
                <Link href="/contact" className="hover:text-foreground transition-colors">Support</Link>
              </nav>
            </div>

            {/* Search Bar - Desktop */}
            <div className="flex-1 max-w-md hidden md:flex items-center mx-auto">
              <form onSubmit={handleSearch} className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  name="q"
                  type="search"
                  placeholder="Search premium products..."
                  className="w-full h-11 pl-11 bg-secondary border-transparent rounded-full focus-visible:ring-2 focus-visible:ring-primary focus-visible:bg-background transition-all shadow-sm"
                />
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <Button variant="ghost" size="icon" className="md:hidden rounded-full hover:bg-secondary" onClick={() => router.push("/search")}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary transition-colors" asChild>
                <Link href="/account">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-secondary transition-colors" asChild>
                <Link href="/wishlist">
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in">
                      {wishlist.length > 99 ? "99+" : wishlist.length}
                    </span>
                  )}
                  <span className="sr-only">Wishlist</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-secondary transition-colors" asChild>
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {totalQuantity > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in">
                      {totalQuantity > 99 ? "99+" : totalQuantity}
                    </span>
                  )}
                  <span className="sr-only">Cart</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
