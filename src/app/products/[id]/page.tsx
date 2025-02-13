import { HeaderTop } from '@/components/headerTop';
import ProductDetail from '@/components/productDetail';
import { getProductById, getProducts } from '@/lib/productsService';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { Product, WithContext } from 'schema-dts';

// This function is called during the build (build time) to generate the static paths for the products
export async function generateStaticParams(): Promise<{ id: string }[]> {
  return getProducts().map((product) => ({
    id: product.id.toString(),
  }));
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductPage({ params, searchParams }: Props) {
  const id = (await params).id;
  const product = getProductById(id);

  if (!product) {
    return notFound();
  }

  const jsonLd: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    sku: product.id.toString(),
    name: product.title,
    description: product.description,
    category: product.category,
    image: {
      '@type': 'ImageObject',
      url: product.image,
      image: product.image,
      name: product.title,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: product.price,
      priceCurrency: 'EUR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.rate,
      ratingCount: product.rating.count,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        key="product-jsonld"
      />
      <HeaderTop />
      <ProductDetail product={product}></ProductDetail>
    </>
  );
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const id = (await params).id;
  const product = getProductById(id);

  // Handle case where product is not found
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  // Generate dynamic metadata
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      type: 'website',
      images: {
        url: product.image,
      },
      siteName: 'Your E-Commerce Store',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary',
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}
