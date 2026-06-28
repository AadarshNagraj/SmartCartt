"use client";

import { useState } from "react";
import { Product, ProductVariant } from "@/services/shopify/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Loader2, Heart, Share2 } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
}

export function VariantSelector({ product }: AddToCartButtonProps) {
  const { addItem, isPending } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  // Group options by name
  const optionGroups: Record<string, string[]> = {};
  product.variants.forEach((v) => {
    v.selectedOptions.forEach(({ name, value }) => {
      if (!optionGroups[name]) optionGroups[name] = [];
      if (!optionGroups[name].includes(value)) optionGroups[name].push(value);
    });
  });

  function getVariantByOptions(selections: Record<string, string>): ProductVariant | undefined {
    return product.variants.find((v) =>
      v.selectedOptions.every((opt) => selections[opt.name] === opt.value)
    );
  }

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    Object.fromEntries(
      product.variants[0]?.selectedOptions.map((o) => [o.name, o.value]) ?? []
    )
  );

  function handleOptionChange(name: string, value: string) {
    const newSelections = { ...selectedOptions, [name]: value };
    setSelectedOptions(newSelections);
    const variant = getVariantByOptions(newSelections);
    if (variant) setSelectedVariant(variant);
  }

  async function handleAddToCart() {
    if (!selectedVariant || isAdding || isPending) return;
    setIsAdding(true);
    try {
      await addItem(selectedVariant.id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } finally {
      setIsAdding(false);
    }
  }

  const currencyCode = product.priceRange.currencyCode;
  const symbol = currencyCode === "INR" ? "₹" : "$";
  const price = parseFloat(selectedVariant.price);
  const compareAt = selectedVariant.compareAtPrice
    ? parseFloat(selectedVariant.compareAtPrice)
    : null;
  const isDiscounted = compareAt && compareAt > price;

  return (
    <div className="flex flex-col gap-6">
      {/* Price */}
      <div className="flex items-end gap-3">
        <span className="text-3xl font-bold">
          {symbol}{price.toFixed(2)}
        </span>
        {isDiscounted && compareAt && (
          <>
            <span className="text-lg text-muted-foreground line-through mb-1">
              {symbol}{compareAt.toFixed(2)}
            </span>
            <Badge className="mb-1 bg-destructive/10 text-destructive hover:bg-destructive/10 border-0">
              Save {symbol}{(compareAt - price).toFixed(2)}
            </Badge>
          </>
        )}
      </div>

      {/* Availability */}
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${selectedVariant.availableForSale ? "bg-green-500" : "bg-red-400"}`} />
        <span className="text-sm text-muted-foreground">
          {selectedVariant.availableForSale
            ? selectedVariant.quantityAvailable > 0
              ? `In stock (${selectedVariant.quantityAvailable} available)`
              : "In stock"
            : "Out of stock"}
        </span>
      </div>

      {/* Variant Options */}
      {Object.entries(optionGroups).map(([optionName, values]) =>
        values.length > 1 || optionName !== "Title" ? (
          <div key={optionName}>
            <h3 className="text-sm font-semibold mb-3">
              {optionName}: <span className="font-normal text-muted-foreground">{selectedOptions[optionName]}</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {values.map((value) => {
                const isSelected = selectedOptions[optionName] === value;
                const variantForOption = getVariantByOptions({
                  ...selectedOptions,
                  [optionName]: value,
                });
                const isAvailable = variantForOption?.availableForSale ?? false;

                return (
                  <button
                    key={value}
                    onClick={() => handleOptionChange(optionName, value)}
                    disabled={!isAvailable}
                    className={`
                      h-11 px-5 rounded-xl border-2 text-sm font-medium transition-all
                      ${isSelected
                        ? "border-primary bg-primary/5 text-primary"
                        : isAvailable
                          ? "border-border hover:border-primary/50 text-foreground"
                          : "border-border/40 text-muted-foreground opacity-50 cursor-not-allowed line-through"
                      }
                    `}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          className="flex-1 h-14 rounded-full text-base"
          onClick={handleAddToCart}
          disabled={!selectedVariant.availableForSale || isAdding || isPending}
        >
          {isAdding ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <ShoppingCart className="mr-2 h-5 w-5" />
          )}
          {!selectedVariant.availableForSale
            ? "Sold Out"
            : added
            ? "Added to Cart!"
            : isAdding
            ? "Adding..."
            : "Add to Cart"}
        </Button>
        <Button size="lg" variant="outline" className="h-14 w-14 rounded-full shrink-0 px-0">
          <Heart className="h-5 w-5" />
          <span className="sr-only">Add to Wishlist</span>
        </Button>
        <Button size="lg" variant="outline" className="h-14 w-14 rounded-full shrink-0 px-0">
          <Share2 className="h-5 w-5" />
          <span className="sr-only">Share</span>
        </Button>
      </div>
    </div>
  );
}
