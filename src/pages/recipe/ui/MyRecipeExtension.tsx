import SearchBox from '@/src/shared/ui/SearchBox';
import TopSection from '@/src/shared/ui/TopSection';

import MyRecipeCatagory from './MyRecipeCatagory';

const MyRecipeExtension = () => {
  return (
    <TopSection.Extension className="items-center justify-start bg-white">
      <SearchBox searchTitle="레시피 검색" />
      <MyRecipeCatagory />
    </TopSection.Extension>
  );
};

export default MyRecipeExtension;
