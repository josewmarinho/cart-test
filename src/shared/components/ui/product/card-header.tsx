export interface CardHeaderProps {
  releaseBadge?: string;
}

const CardHeader = ({ releaseBadge }: CardHeaderProps) => {
  return (
    <div
      className={`flex ${
        releaseBadge ? 'justify-between' : 'justify-end'
      } absolute top-0 z-10 w-full`}
    >
      {releaseBadge && (
        <span className="mx-2 mt-2 flex h-6 w-20 items-center justify-center rounded-md bg-yellow-600 text-xs font-semibold">
          {releaseBadge}
        </span>
      )}
    </div>
  );
};

export { CardHeader };
