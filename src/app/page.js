import RecommendSlider from "@/components/RecommendSlider";
import Slider from "../components/Slider";
import ShopByPet from "@/components/ShopByPet";
export default function Home() {
  return (
    <div className="xl:px-35 md:px-10 px-4">
      <Slider />
      <ShopByPet />
      <RecommendSlider title="Bestsellers" />
      <RecommendSlider title="Pet Parent Favourites" />
    </div>
  );
}
