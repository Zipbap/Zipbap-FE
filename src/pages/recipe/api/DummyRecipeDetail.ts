import type { RecipeDetailItem } from '@/src/entities/recipe/model/RecipeDetailTypes';

export const dummyRecipeDetail: RecipeDetailItem = {
  id: '2',
  nickname: '요리왕 키키',
  title: '초간단 10분 김치볶음밥',
  subTitle: '바쁜 아침, 뚝딱 만드는 황금 레시피!',
  createdAt: '2025-09-05',
  mainImage: 'https://placehold.co/800x600?text=Main+Image',
  content:
    '김치와 찬밥만 있다면 5분 만에 완성하는 마법의 김치볶음밥 레시피입니다. 누구나 실패 없이 만들 수 있어요!',
  cookingTime: 10,
  difficulty: '쉬움',
  recipeIntroduce:
    '오늘은 냉장고 속 재료로 후다닥 만들 수 있는 김치볶음밥을 가져왔어요. 특별한 재료 없이도 깊은 맛이 나는 비법을 알려드립니다!',
  categories: ['한식', '밥', '간단'],
  serving: '2인분',
  ingredients: '김치 150g, 밥 2공기, 참기름 1큰술, 간장 1큰술, 고춧가루 1작은술, 계란 2개',
  video: 'https://www.youtube.com/shorts/b6X4zAXtFNo?feature=share',
  steps: [
    {
      step: 1,
      title: '재료 준비하기',
      description: '김치를 잘게 썰고, 찬밥을 준비해둡니다. 계란은 따로 풀어 놓으세요.',
      image: 'https://placehold.co/600x400?text=Step+1',
    },
    {
      step: 2,
      title: '김치 볶기',
      description: '달군 팬에 식용유를 두르고 김치를 넣고 2분간 볶습니다.',
      image: 'https://placehold.co/600x400?text=Step+2',
    },
    {
      step: 3,
      title: '밥 넣고 볶기',
      description: '김치가 익으면 찬밥을 넣고 밥알이 뭉치지 않게 잘 풀어가며 볶아줍니다.',
      image: 'https://placehold.co/600x400?text=Step+3',
    },
    {
      step: 4,
      title: '양념 넣고 마무리',
      description:
        '고춧가루와 간장을 넣고 30초간 더 볶은 후, 참기름으로 마무리합니다. 계란 프라이를 올려주면 더욱 맛있어요!',
      image: 'https://placehold.co/600x400?text=Step+4',
    },
  ],
  tip: '김치를 볶을 때 설탕을 조금 넣어주면 신맛이 줄어들어 더욱 맛있습니다.',
};
