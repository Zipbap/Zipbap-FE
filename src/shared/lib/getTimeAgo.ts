export const getTimeAgo = (dateString: string): string => {
  // createdAt 문자열을 UTC로 인식
  const targetUTC = new Date(dateString);

  // 한국 시간 기준으로 보정 (+9시간)
  const targetKST = new Date(targetUTC.getTime() + 9 * 60 * 60 * 1000);

  const nowKST = new Date();
  const diff = Math.floor((nowKST.getTime() - targetKST.getTime()) / 1000); // 초 단위 차이

  if (diff < 60) return `${diff}초 전`;
  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}주 전`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}개월 전`;
  const years = Math.floor(days / 365);
  return `${years}년 전`;
};
