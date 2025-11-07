import ProductCard from "../components/shop/ProductCard";
import ProductHero from "../components/shop/ProductHero";
import ProductPromo from "../components/shop/ProductPromo";
import ProductSection from "../components/shop/ProductSection";

function Shop() {
  const fakeArray = [
    {
      id: 1,
      name: "უნიკალური ჰუდი",
      description: "მაიკა, რომელიც შენს უთქმელ სიტყვებს ამბობს",
      imgUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
      price: 19.99,
      category: "ტანსაცმელი"
    },
    {
      id: 1,
      name: "ამ ჩანთით სიმძიმეს დავატარებ",
      description: "მაიკა, რომელიც შენს უთქმელ სიტყვებს ამბობს",
      imgUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
      price: 19.99,
      category: "ტანსაცმელი"
    },
    {
      id: 1,
      name: "რა ლამაზია",
      description: "მაიკა, რომელიც შენს უთქმელ სიტყვებს ამბობს",
      imgUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800",
      price: 19.99,
      category: "ტანსაცმელი"
    },
    {
      id: 1,
      name: "უთქმელი მაიკა",
      description: "მაიკა, რომელიც შენს უთქმელ სიტყვებს ამბობს",
      imgUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      price: 19.99,
      category: "ტანსაცმელი"
    },
    {
      id: 1,
      name: "ცრემლიანი ფურცელი",
      description: "მაიკა, რომელიც შენს უთქმელ სიტყვებს ამბობს",
      imgUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800",
      price: 19.99,
      category: "ტანსაცმელი"
    },
    {
      id: 1,
      name: "ცრემლიანი ფურცელი",
      description: "მაიკა, რომელიც შენს უთქმელ სიტყვებს ამბობს",
      imgUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800",
      price: 19.99,
      category: "ტანსაცმელი"
    }
  ];

  return (
    <main>
        <ProductHero />
        <section className="max-w-7xl mx-auto px-6 py-12">
          <ProductSection products={fakeArray} />
          <ProductPromo />
        </section>
    </main>
  );
}

export default Shop;