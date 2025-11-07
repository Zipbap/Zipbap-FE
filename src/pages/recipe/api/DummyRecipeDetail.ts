import { RecipeDetailItem } from '@entities/recipe';

export const dummyRecipeDetail: RecipeDetailItem = {
  id: '2',
  nickname: '자취킹',
  title: '김치볶음밥',
  subTitle: '한국인의 밥상 대표 메뉴, 매콤달콤 김치볶음밥',
  createdAt: '2025-11-07',
  mainImage: 'https://i.ifh.cc/gDT5Cz.jpg',
  content:
    '집에 있는 재료로 간단히 만들 수 있는 한 그릇 요리입니다. 남은 김치 활용도 가능하며, 누구나 쉽게 만들 수 있어요.',
  cookingTime: 10,
  difficulty: '쉬움',
  recipeIntroduce:
    '오늘은 냉장고 속 재료로 후다닥 만들 수 있는 김치볶음밥을 가져왔어요. 특별한 재료 없이도 깊은 맛이 나는 비법을 알려드립니다!',
  categories: ['한식', '밥', '간단'],
  serving: '2인분',
  ingredients:
    '밥 1공기, 김치 1컵, 돼지고기 다진 것 100g, 양파 1/2개, 대파 1대, 식용유 1큰술, 참기름 1작은술, 간장 1작은술, 고추장 1큰술, 설탕 1/2작은술, 계란 1개, 김가루 약간',
  video:
    'file:///data/user/0/com.zipbap/cache/ImagePicker/eba12da9-efb9-459f-8764-3ff93439f8b7.mp4',
  steps: [
    {
      step: 1,
      title: '재료 손질 & 준비',
      description:
        '팬에 식용유를 두르고 다진 돼지고기, 양파, 대파, 김치를 넣고 중불에서 볶습니다. 김치가 살짝 익으면 고추장, 간장, 설탕을 넣고 섞습니다.',
      image: 'https://i.ifh.cc/pFSWz4.jpg',
    },
    {
      step: 2,
      title: '밥과 재료 섞기',
      description:
        '밥을 넣고 재료와 잘 섞이도록 볶습니다. 마지막에 참기름을 두르고 계란 프라이를 올린 뒤, 김가루를 뿌려 완성합니다.',
      image: 'https://i.ifh.cc/sWon5S.jpg',
    },
  ],
  tip: '계란 노른자를 살짝 터뜨리면 크리미하게 변신!',
};
