//================== Delete This File afterwards ==================


// import { useEffect, useState } from 'react'
// import { supabase } from '../utils/supaClient'

// function Home() {
//   const [imageUrl, setImageUrl] = useState("");

//   useEffect(() => {
//     const fetchImage = async () => {
//       const { data } = supabase.storage 
//         .from("photos")
//         .getPublicUrl("peakpx.jpg");

//       setImageUrl(data.publicUrl);
//     }

//     fetchImage();
//   }, []);

//   return (
//     <div>
//       {imageUrl ? <img src={imageUrl} alt="gundam" /> : <p>Loading...</p>}
//     </div>
//   )
// }

// export default Home
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supaClient';

interface ProductImage {
  image_url: string;
  buckets: string;
  publicUrl?: string;
}

interface Product {
  product_id: number;
  name: string;
  price: number;
  product_images: ProductImage[];
}

export default function Home() {
  const [product, setProduct] = useState<Product | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      // Step 1: fetch all products to see what IDs exist
      const { data: allProducts } = await supabase
        .from('product')
        .select('product_id, name');
      console.log('All products:', allProducts);

      // Step 2: fetch product + images (change product_id as needed)
      const { data, error } = await supabase
        .from('product')
        .select(`
          product_id,
          name,
          price,
          product_images (
            image_url,
            buckets
          )
        `)
        .eq('product_id', 3)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
        setLoading(false);
        return;
      }

      console.log('Product data:', data);
      setProduct(data);

      // Step 3: check if images exist
      if (!data.product_images || data.product_images.length === 0) {
        console.warn('No images found — check RLS on product_images table or verify the product_id in your INSERT');
        setLoading(false);
        return;
      }

      // Step 4: get public URLs from Supabase storage
      const urls = data.product_images.map((img: ProductImage) => {
        const { data: urlData } = supabase.storage
          .from(img.buckets)
          .getPublicUrl(img.image_url);
        console.log('Generated URL:', urlData.publicUrl);
        return urlData.publicUrl;
      });

      setImageUrls(urls);
      setLoading(false);
    };

    fetchProduct();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Product ID: {product.product_id}</p>

      <h2>Images ({imageUrls.length})</h2>

      {imageUrls.length === 0 ? (
        <p style={{ color: 'red' }}>
          No images found. Check: <br />
          1. RLS policy on product_images table <br />
          2. The product_id in your INSERT matches product_id 2 <br />
          3. Your bucket "eg_kits" is set to public
        </p>
      ) : (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`${product.name} - image ${index + 1}`}
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              onError={(e) => {
                console.error('Image failed to load:', url);
                (e.target as HTMLImageElement).style.border = '2px solid red';
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}