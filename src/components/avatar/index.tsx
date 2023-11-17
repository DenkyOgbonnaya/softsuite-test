import Image from "next/image";
import styles from "./avatar.module.scss";

export interface AvatarProps {
  url?: string;
  alt?: string;
}
export default function Avatar({ url, alt = "" }: AvatarProps) {
  return (
    <div className={styles.avatar}>
      <Image src={url || "/images/defaultAvatar.png"} alt={alt} fill />
    </div>
  );
}
