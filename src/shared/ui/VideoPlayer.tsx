import { useVideoPlayer, VideoView } from 'expo-video';

interface Props {
  videoSource: string;
  style: object;
}

const VideoPlayer = ({ videoSource, style }: Props) => {
  const player = useVideoPlayer(videoSource, player => {
    player.loop = false;
    player.muted = false;
  });

  return <VideoView player={player} style={style} />;
};

export default VideoPlayer;
