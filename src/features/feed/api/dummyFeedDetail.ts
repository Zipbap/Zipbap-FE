import { FeedDetail } from '@entities/feed';

export const dummyFeedDetail: FeedDetail = {
  id: '4',
  profileImage:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4orYFZ-hqpOZA3Zjavhag7Tbbi3EaahLcfg&s',
  nickname: '지원',
  title: '된장찌개',
  subTitle: '한국인의 소울푸드, 구수한 된장찌개 한 그릇!',
  views: 180,
  isFollowing: false,
  followers: 120, // 원본에 없으므로 0 처리
  introduce: '요리하는 학생이에요!', // 원본에 소개 없으므로 빈 문자열
  createdAt: '2025-11-02', // 임의 생성
  mainImage:
    'https://recipe1.ezmember.co.kr/cache/recipe/2023/01/04/4b577bb2d8e62cbf4513769a394848461.jpg',
  content: '한국인의 소울푸드, 구수한 된장찌개 한 그릇!',
  cookingTime: 25,
  difficulty: '쉬움',
  ingredientsCount: 10,
  likes: 95,
  bookmarks: 22,
  comments: 12,
  isLiked: false,
  isBookmarked: false,
  isCommented: false,
  recipeIntroduce: '구수하고 따뜻한 된장찌개 레시피입니다. 누구나 쉽게 따라할 수 있어요!',
  categories: ['한식', '찌개'],
  serving: '2인분', // 임의 생성
  ingredients:
    '된장 3큰술, 두부 1/2모, 애호박 1/2개, 양파 1/2개, 감자 1개, 대파 1대, 마늘 1쪽, 청양고추 1개, 물 500ml, 멸치 10마리',
  video: '', // 원본에 없으므로 빈 문자열
  steps: [
    {
      step: 1,
      title: '재료 준비하기',
      description: '모든 재료를 손질하고, 멸치 육수를 준비합니다.',
      image: 'https://i.ifh.cc/dvhNjg.jpg', // 원본에 없으므로 빈 문자열
    },
    {
      step: 2,
      title: '육수 끓이기',
      description: '멸치와 다시마로 육수를 끓입니다.',
      image: 'https://i.ifh.cc/LofhQy.jpg',
    },
    {
      step: 3,
      title: '재료 넣고 끓이기',
      description: '준비한 재료를 넣고 된장을 풀어 끓입니다. 중간 중간 거품은 제거해주세요.',
      image: 'https://i.ifh.cc/bMylQX.jpg',
    },
    {
      step: 4,
      title: '마무리',
      description: '대파와 청양고추를 넣고 1~2분 더 끓인 후 불을 끕니다. 완성!',
      image: 'https://i.ifh.cc/4noaNJ.jpg',
    },
  ],
  tip: '된장찌개를 끓일 때 불을 너무 세게 하지 않으면 국물이 깔끔해집니다.',
};
