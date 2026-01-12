import TiltedCard from "@/components/TiltedCard";
import { ProfileCard, type ProfileCardProps } from "./ProfileCard";

export function Profile(props: ProfileCardProps) {
  return (
    <TiltedCard
      imageSrc="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      altText={props.name}
      captionText={props.name}
      containerHeight="500px"
      containerWidth="400px"
      imageHeight="500px"
      imageWidth="400px"
      rotateAmplitude={12}
      scaleOnHover={1.05}
      showMobileWarning={false}
      showTooltip={false}
      displayOverlayContent={true}
      overlayContent={<ProfileCard {...props} />}
    />
  );
}
