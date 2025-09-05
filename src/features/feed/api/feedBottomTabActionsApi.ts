//피드에 좋아요를 누르거나 취소하는 API를 호출합니다.
export const toggleLike = async (feedId: string, isLiked: boolean): Promise<void> => {
  console.log(`${feedId}에 대한 좋아요 상태를 ${isLiked ? '취소' : '변경'}합니다.`);
  // 실제 API 호출 로직을 여기에 구현
  // 예: await axios.post(`/api/feed/${feedId}/like`, { isLiked });
};

//피드를 북마크하거나 취소하는 API를 호출합니다.
export const toggleBookmark = async (feedId: string, isBookmarked: boolean): Promise<void> => {
  console.log(`${feedId}에 대한 북마크 상태를 ${isBookmarked ? '취소' : '변경'}합니다.`);
  // 실제 API 호출 로직을 여기에 구현
  // 예: await axios.post(`/api/feed/${feedId}/bookmark`, { isBookmarked });
};

//피드에 댓글을 추가하거나 삭제하는 API를 호출합니다.
export const toggleComment = async (feedId: string, isCommented: boolean): Promise<void> => {
  console.log(`${feedId}에 대한 댓글 상태를 ${isCommented ? '취소' : '변경'}합니다.`);
  // 실제 API 호출 로직을 여기에 구현
  // 예: await axios.post(`/api/feed/${feedId}/comment`, { isCommented });
};
