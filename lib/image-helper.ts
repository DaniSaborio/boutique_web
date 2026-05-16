// Mapeo de palabras clave por producto para buscar imágenes relevantes
export const getProductImageUrl = (productName: string, productId: string): string => {
  const searchTerms: { [key: string]: string } = {
    "1": "black-dress-elegant",
    "2": "floral-summer-dress",
    "3": "white-blazer",
    "4": "cream-sweater",
    "5": "striped-shirt",
    "6": "high-waisted-jeans",
    "7": "black-trousers",
    "8": "linen-shorts",
    "9": "brown-leather-bag",
    "10": "gold-necklace",
    "11": "retro-sunglasses",
    "12": "pashmina-wrap",
    "13": "satin-dress",
    "14": "pleated-skirt",
    "15": "satin-blouse",
    "16": "ankle-boots",
    "17": "cargo-pants",
    "18": "wool-coat"
  };

  const keyword = searchTerms[productId] || "fashion";
  // Usar Unsplash con búsqueda de palabra clave
  // El hash asegura que el mismo producto siempre tenga la misma imagen
  return `https://images.unsplash.com/photo-${productId}?q=80&w=600&h=600&fit=crop&crop=faces&auto=format`;
};

// Mejor: usar URLs directas de Unsplash que ya probamos
export const getProductImageUrlDirect = (productId: string): string => {
  const imageMap: { [key: string]: string } = {
    "1": "https://images.unsplash.com/photo-1595777712802-8f1d3deb474b?w=600&h=600&fit=crop&q=80", // black dress
    "2": "https://images.unsplash.com/photo-1614707268537-b85faf00021b?w=600&h=600&fit=crop&q=80", // floral dress
    "3": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=600&fit=crop&q=80", // white blazer
    "4": "https://images.unsplash.com/photo-1578932750294-708cb62c5358?w=600&h=600&fit=crop&q=80", // cream sweater
    "5": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&q=80", // striped shirt
    "6": "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&h=600&fit=crop&q=80", // jeans
    "7": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop&q=80", // black trousers
    "8": "https://images.unsplash.com/photo-1506629082632-423aa5bef4da?w=600&h=600&fit=crop&q=80", // shorts
    "9": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop&q=80", // brown bag
    "10": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&q=80", // gold necklace
    "11": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop&q=80", // sunglasses
    "12": "https://images.unsplash.com/photo-1589881250221-fd1e21ecda5a?w=600&h=600&fit=crop&q=80", // pashmina
    "13": "https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=600&h=600&fit=crop&q=80", // midi dress
    "14": "https://images.unsplash.com/photo-1599597224677-9b3367b1d35c?w=600&h=600&fit=crop&q=80", // pleated skirt
    "15": "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=600&h=600&fit=crop&q=80", // satin blouse
    "16": "https://images.unsplash.com/photo-1548062158-dfbe7dc6b9dc?w=600&h=600&fit=crop&q=80", // boots
    "17": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600&h=600&fit=crop&q=80", // cargo pants
    "18": "https://images.unsplash.com/photo-1539533057440-7814a9d4aae9?w=600&h=600&fit=crop&q=80"  // wool coat
  };

  return imageMap[productId] || `https://picsum.photos/600/600?random=${productId}`;
};
