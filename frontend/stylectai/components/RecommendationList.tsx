
import { Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";


import FashionItem from "./SingleProduct";
import OutfitCard from "./OutfitCard";
import { useSelector } from "react-redux"
import { Key } from "react";


const FashionRecommendations = () => {
  const mockSingleItems = useSelector((state) => state.singleRecommendations.singleRecommendations);
  const mockOutfitItems = useSelector((state) => state.outfitRecommendations.outfitRecommendations);

  return (
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="mb-3">
          <h2 className="text-lg md:text-xl font-playfair font-medium mb-1">
            Top Picks <span className="text-primary">for You</span>
          </h2>
          <p className="text-xs text-muted-foreground">
            Curated items based on your style preferences
          </p>
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-4 border-b mb-3">
            <Tab
                className={({selected}) =>
                    cn(
                        "px-3 py-1 text-xs font-medium outline-none",
                        selected
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-muted"
                    )
                }
            >
              Individual Items
            </Tab>
            <Tab
                className={({selected}) =>
                    cn(
                        "px-3 py-1 text-xs font-medium outline-none",
                        selected
                            ? "border-b-2 border-primary text-primary"
                            : "text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-muted"
                    )
                }
            >
              Complete Outfits
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel className="animate-fade-in">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {mockSingleItems && mockSingleItems.slice(0, 6).map((item, index) => (
                    <FashionItem
                        key={index}
                        image={item?.image}
                        price={item?.price}
                        name={item?.name}
                    />
                ))}
              </div>
            </Tab.Panel>

            <Tab.Panel className="animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {mockOutfitItems && mockOutfitItems.map((outfit: { image: string; title: string; }, index: Key | null | undefined) => (
                <OutfitCard
                  key={index}
                  image={outfit.image}
                  title={outfit.title}
                />
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default FashionRecommendations;
