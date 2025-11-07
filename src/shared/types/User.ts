// NOTE: 내 유저 불러오기
export interface User {
  id: string;
  nickname: string;
  isPrivate: false;
  statusMessage: string | null;
  profileImage: string | null;
}
