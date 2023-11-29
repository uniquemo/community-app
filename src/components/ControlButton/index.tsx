
export const ControlButton: React.FC<{
  icon: string;
  alt: string;
  muted?: boolean;
  title?: string;
  onClick?: () => void;
}> = ({ icon, alt, title, onClick, muted }) => {
  return (
    <img
      style={{ opacity: muted ? 0.5 : 1 }}
      title={title}
      src={icon}
      alt={alt}
      onClick={onClick}
    />
  );
};