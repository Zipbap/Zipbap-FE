import TopSection from '@/src/shared/ui/TopSection';
import SearchBox from '@/src/shared/ui/SearchBox';
import MyFeedCatagory from './MyFeedCatagory';

const MyFeedExtension = () => {
  return (
    <TopSection.Extension className="items-center justify-start bg-white">
      <SearchBox searchTitle="레시피 검색" />
      <MyFeedCatagory />
    </TopSection.Extension>
  );
};

export default MyFeedExtension;
