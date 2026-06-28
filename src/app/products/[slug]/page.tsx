import { productRepository } from '@/commerce/repositories/implementations/ShopifyProductRepository';
import { ProductClientView } from '@/components/product/ProductClientView/ProductClientView';
import { JsonLd } from '@/components/seo/JsonLd';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const revalidate = 600; // 10 minutes cache as requested

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
  try {
    const params = await props.params;
    const product = await productRepository.getProductByHandle(params.slug);
    
    return {
      title: product.seo?.title || `${product.title} | SmartCart`,
      description: product.seo?.description || product.description,
      openGraph: {
        title: product.seo?.title || product.title,
        description: product.seo?.description || product.description,
        images: product.images.length > 0 ? [{ url: product.images[0].url }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: product.seo?.title || product.title,
        description: product.seo?.description || product.description,
        images: product.images.length > 0 ? [product.images[0].url] : [],
      },
      alternates: {
        canonical: `/products/${product.handle}`
      }
    };
  } catch (error) {
    return {
      title: 'Product Not Found | SmartCart'
    };
  }
}

export default async function ProductPage(props: ProductPageProps) {
  try {
    const params = await props.params;
    const handle = params.slug;

    const product = await productRepository.getProductByHandle(handle);
    const recommendedProducts = await productRepository.getRecommendedProducts(product.id, 4);

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartcart.sbs';
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.title,
      "image": product.images.length > 0 ? product.images[0].url : undefined,
      "description": product.seo?.description || product.description,
      "sku": product.handle,
      "brand": {
        "@type": "Brand",
        "name": product.vendor || "SmartCart"
      },
      "offers": {
        "@type": "AggregateOffer",
        "url": `${baseUrl}/products/${product.handle}`,
        "priceCurrency": product.priceRange?.minVariantPrice?.currencyCode || "USD",
        "lowPrice": parseFloat(product.priceRange?.minVariantPrice?.amount || "0"),
        "highPrice": parseFloat(product.priceRange?.maxVariantPrice?.amount || "0"),
        "offerCount": product.variants?.length || 1,
        "availability": "https://schema.org/InStock",
      }
    };

    return (
      <>
        <JsonLd data={productSchema} />
        <ProductClientView 
          product={product} 
          recommendedProducts={recommendedProducts} 
        />
      </>
    );
  } catch (error: any) {
    if (error.name === 'ProductNotFoundError') {
      notFound();
    }
    throw error;
  }
}
