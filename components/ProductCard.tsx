"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/services/shopify/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Loader2, Heart, Eye, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isPending } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const firstVariant = product.variants[0];
  const minPrice = product.priceRange.minVariantPrice;
  const compareAtPrice = firstVariant?.compareAtPrice;
  const isDiscounted = compareAtPrice && parseFloat(compareAtPrice) > parseFloat(minPrice);
  
  // Calculate savings
  let savingsPercent = 0;
  if (isDiscounted && compareAtPrice) {
    savingsPercent = Math.round(((parseFloat(compareAtPrice) - parseFloat(minPrice)) / parseFloat(compareAtPrice)) * 100);
  }

  // Hardcode INR as requested for Indian ecommerce brand
  const currencySymbol = "₹";

  const isWished = wishlist.includes(product.handle);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWished) {
      removeFromWishlist(product.handle);
    } else {
      addToWishlist(product.handle);
    }
  };

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    if (!firstVariant || isAdding || isPending) return;
    setIsAdding(true);
    try {
      await addItem(firstVariant.id, 1);
    } finally {
      setIsAdding(false);
    }
  }

  async function handleBuyNow(e: React.MouseEvent) {
    e.preventDefault();
    if (!firstVariant || isBuying || isPending) return;
    setIsBuying(true);
    try {
      await addItem(firstVariant.id, 1);
      window.location.href = "/cart"; // Redirect to cart or checkout
    } finally {
      setIsBuying(false);
    }
  }

  const imageUrl = product.featuredImage || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"; // Premium fallback

  return (
    <Card className="group flex flex-col justify-between overflow-hidden border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white rounded-2xl">
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary w-full">
        <Link href={`/products/${product.handle}`} className="block w-full h-full">
          <Image
            src={imageUrl}
            alt={product.featuredImageAlt || product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {isDiscounted && (
            <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive font-bold px-2 py-0.5 border-none shadow-sm">
              Save {savingsPercent}%
            </Badge>
          )}
          {!product.availableForSale ? (
            <Badge variant="secondary" className="bg-black/80 text-white border-none font-bold px-2 py-0.5 backdrop-blur-sm">Sold Out</Badge>
          ) : (
            <Badge className="bg-success text-success-foreground border-none font-bold px-2 py-0.5 shadow-sm">In Stock</Badge>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <Button 
            variant="secondary" 
            size="icon" 
            className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-md shadow-sm hover:bg-white text-foreground hover:text-destructive transition-colors"
            onClick={toggleWishlist}
          >
            <Heart className={cn("h-4 w-4", isWished && "fill-destructive text-destructive")} />
            <span className="sr-only">Wishlist</span>
          </Button>
          <Button 
            variant="secondary" 
            size="icon" 
            className="h-9 w-9 rounded-full bg-white/90 backdrop-blur-md shadow-sm hover:bg-white text-foreground transition-colors"
            asChild
          >
            <Link href={`/products/${product.handle}`}>
              <Eye className="h-4 w-4" />
              <span className="sr-only">Quick View</span>
            </Link>
          </Button>
        </div>
      </div>

      <CardContent className="p-5 flex-grow flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold">4.8</span>
            <span className="text-xs text-muted-foreground">(124)</span>
          </div>
          <span className="text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">Free Delivery</span>
        </div>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">{product.vendor}</p>
          <Link href={`/products/${product.handle}`} className="font-bold text-lg leading-tight line-clamp-2 hover:text-primary transition-colors">
            {product.title}
          </Link>
        </div>

        <div className="flex flex-col mt-auto pt-2">
          <div className="flex items-end gap-2">
            <span className="font-extrabold text-xl">{currencySymbol}{parseFloat(minPrice).toLocaleString("en-IN")}</span>
            {isDiscounted && compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through mb-0.5">
                {currencySymbol}{parseFloat(compareAtPrice).toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-medium">💳 COD Available</p>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <Button
            size="sm"
            variant="outline"
            className="w-1/2 rounded-xl font-bold transition-all border-border hover:bg-secondary"
            onClick={handleAddToCart}
            disabled={!product.availableForSale || isAdding || isPending}
          >
            {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4 mr-2" />}
            {isAdding ? "Wait..." : "Add"}
          </Button>
          <Button
            size="sm"
            className="w-1/2 rounded-xl font-bold transition-all shadow-sm"
            onClick={handleBuyNow}
            disabled={!product.availableForSale || isBuying || isPending}
          >
            {isBuying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4 mr-2" />}
            {isBuying ? "Wait..." : "Buy"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
