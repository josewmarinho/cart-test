type MinusIconProps = {
  enabled: boolean;
};

export function MinusIcon({ enabled }: MinusIconProps) {
  return (
    <svg
      width="14"
      height="2"
      viewBox="0 0 14 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.5 2H0.5V0H13.5V2Z" fill={enabled ? '#000000' : '#DDDDDD'} />
    </svg>
  );
}
