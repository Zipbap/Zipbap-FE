// NOTE: 내 유저 불러오기
export interface User {
  id: string;
  nickname: string;
  isPrivate: boolean;
  statusMessage: string | null;
  profileImage: string | null;
}
