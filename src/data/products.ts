export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Leather Boots",
    price: 120,
    description: "Handcrafted classic leather boots, perfect for any occasion.",
    image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "2",
    name: "Denim Jacket",
    price: 85,
    description: "Timeless denim jacket with a modern fit.",
    image: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?q=80&w=300&h=300&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Wireless Headphones",
    price: 199,
    description: "Noise-canceling wireless headphones with premium sound quality.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&h=300&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Smart Watch",
    price: 249,
    description: "Stay connected and track your fitness with this smart watch.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&h=300&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Canvas Backpack",
    price: 55,
    description: "Durable canvas backpack for your daily commute or travel.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=300&h=300&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Minimalist Watch",
    price: 150,
    description: "A clean and minimalist watch for a sophisticated look.",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=300&h=300&auto=format&fit=crop"
  }
];
