type PlusIconProps = {
  enabled: boolean;
};

export function PlusIcon({ enabled }: PlusIconProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 7.92857H7.92857V13.5H6.07143V7.92857H0.5V6.07143H6.07143V0.5H7.92857V6.07143H13.5V7.92857Z"
        fill={enabled ? '#000000' : '#DDDDDD'}
      />
    </svg>
  );
}
