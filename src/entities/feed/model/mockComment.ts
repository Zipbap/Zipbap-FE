import { Comment } from '.';

export const mockComments: Comment[] = [
  {
    id: '6',
    nickname: '이준호',
    profileImage: 'https://newsimg.sedaily.com/2023/11/08/29X5NEOB5U_1.jpg',
    content: '저는 닭 대신 두부로 해봤는데 생각보다 맛있었어요! 건강하게 먹기 딱이에요 💚',
    createdAt: '1일 전',
    likeCount: 25,
    isLiked: true,
    replies: [
      {
        id: '7',
        parentId: '6',
        nickname: '최준',
        profileImage: 'https://image.ajunews.com/content/image/2021/10/11/20211011204408352077.jpg',
        content: '두부 버전이라니 신기하네요! 다음에 꼭 시도해봐야겠어요 😆',
        createdAt: '22시간 전',
        likeCount: 8,
        isLiked: false,
      },
      {
        id: '8',
        parentId: '6',
        nickname: '자취킹',
        profileImage:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG1AeGzp_5HxeH2Q7qE9UG5ef3VYmitAuqKw&s',
        content: '두부로 하면 식감이 좀 다를 것 같아요! 간은 그대로 하신 건가요?',
        createdAt: '20시간 전',
        likeCount: 1,
        isLiked: false,
      },
    ],
  },
  {
    id: '1',
    nickname: '자취킹',
    profileImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG1AeGzp_5HxeH2Q7qE9UG5ef3VYmitAuqKw&s',
    content:
      '이 레시피대로 따라했더니 진짜 맛있었어요! 이번주에 벌써 두 번이나 만들었어요! 남편도 너무 좋아하네요 😋',
    createdAt: '7시간 전',
    likeCount: 12,
    isLiked: true,
    replies: [
      {
        id: '2',
        parentId: '1',
        nickname: '요리천재',
        profileImage:
          'https://mblogthumb-phinf.pstatic.net/20121228_209/jmj4969_1356683129749hTkjU_JPEG/IMG_7040-1.jpg?type=w420',
        content: '그쵸! 저도 그대로 따라했는데 간이 딱 맞아서 너무 좋았어요 😍',
        createdAt: '3시간 전',
        likeCount: 4,
        isLiked: false,
      },
      {
        id: '3',
        parentId: '1',
        nickname: 'Chef Park',
        profileImage:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiJOisEl4nF_mKqZZS5iGTWFsbRn_V-fvxSQ&s',
        content: '전 약간 더 달게 해서 먹었어요! 개인적으로 그렇게 하니까 더 맛있더라구요 🍯',
        createdAt: '2시간 전',
        likeCount: 7,
        isLiked: true,
      },
    ],
  },
  {
    id: '4',
    nickname: 'Chef Park',
    profileImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiJOisEl4nF_mKqZZS5iGTWFsbRn_V-fvxSQ&s',
    content: '조리 시간은 얼마나 걸리나요? 퇴근하고 만들어도 충분할지 궁금해요!',
    createdAt: '5시간 전',
    likeCount: 3,
    isLiked: false,
    replies: [
      {
        id: '5',
        parentId: '4',
        nickname: '하나',
        profileImage:
          'https://recipe1.ezmember.co.kr/cache/recipe/2019/04/01/f8b3042c80a214dd7cc60fa2027cdc9d1.jpg',
        content: '20분 정도면 충분해요! 미리 재료 손질만 해두면 훨씬 빨라요 ⏱️',
        createdAt: '4시간 전',
        likeCount: 2,
        isLiked: true,
      },
    ],
  },
  {
    id: '9',
    nickname: '요리천재',
    profileImage:
      'https://mblogthumb-phinf.pstatic.net/20121228_209/jmj4969_1356683129749hTkjU_JPEG/IMG_7040-1.jpg?type=w420',
    content: '사진이랑 완전 똑같이 나왔어요 🤩 덕분에 부모님이 엄청 칭찬하셨어요!',
    createdAt: '2일 전',
    likeCount: 16,
    isLiked: true,
  },
  {
    id: '10',
    nickname: 'Chef Park',
    profileImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiJOisEl4nF_mKqZZS5iGTWFsbRn_V-fvxSQ&s',
    content: '혹시 소스는 미리 만들어둬도 괜찮을까요?',
    createdAt: '3일 전',
    likeCount: 5,
    isLiked: false,
    replies: [
      {
        id: '11',
        parentId: '10',
        nickname: '지원',
        profileImage:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4orYFZ-hqpOZA3Zjavhag7Tbbi3EaahLcfg&s',
        content: '네! 하루 정도 냉장 보관해도 괜찮아요. 대신 사용 전에 한 번 데워주세요 🔥',
        createdAt: '2일 전',
        likeCount: 4,
        isLiked: true,
      },
    ],
  },
];
