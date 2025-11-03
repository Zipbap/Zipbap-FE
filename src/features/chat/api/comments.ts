import axios from 'axios';
import { Comment, mockComments } from '@entities/feed';

const API_BASE = 'https://your-api.com'; // 실제 서버 주소로 교체
const USE_MOCK = true; // true면 mock 사용, false면 실제 API 호출

export const fetchCommentsApi = async (feedId: string): Promise<Comment[]> => {
  if (USE_MOCK) {
    console.log('[API] mock 댓글 불러오기');
    return new Promise(resolve => {
      setTimeout(() => resolve(mockComments), 300); // 0.3초 딜레이
    });
  }

  try {
    const res = await axios.get<Comment[]>(`${API_BASE}/comments?feedId=${feedId}`);
    return res.data;
  } catch (err) {
    console.error('[API] 댓글 불러오기 실패:', err);
    return [];
  }
};

interface CreateCommentPayload {
  feedId: string;
  content: string;
  parentId?: string | null;
  nickname: string;
  profileImage: string;
}

export const createCommentApi = async (payload: CreateCommentPayload) => {
  try {
    const res = await axios.post(`${API_BASE}/comments`, payload);
    return res.data;
  } catch (err) {
    console.error('[API] 댓글 작성 실패:', err);
    throw err;
  }
};
