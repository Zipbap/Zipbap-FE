import TopSection from '@/src/shared/ui/TopSection';
import SearchBox from '@/src/shared/ui/SearchBox';
import MyRecipeCatagory from './MyRecipeCatagory';
const MyRecipeExtension = () => {
  return (
    <TopSection.Extension className="justify-start items-center bg-white">
      <SearchBox />
      <MyRecipeCatagory />
    </TopSection.Extension>
  );
};

export default MyRecipeExtension;
