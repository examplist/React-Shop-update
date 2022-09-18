export default function Stars({
  rate,
  standard,
}: {
  rate: number;
  standard: number;
}) {
  const totalHalfStars = standard * 2;
  const starElements = [];

  function Star({
    side,
    checked,
  }: {
    side: 'mask-half-1' | 'mask-half-2';
    checked: boolean;
  }) {
    return (
      <input
        type="radio"
        name="rating-10"
        className={`bg-yellow-400 cursor-default mask mask-star-2 ${side}`}
        disabled
        checked={checked}
      />
    );
  }

  for (let i = 0; i < totalHalfStars; i++) {
    const side = i % 2 === 0 ? 'mask-half-1' : 'mask-half-2';
    const checked = Math.floor(rate * 2) - 1 === i ? true : false;

    starElements.push(<Star key={i} side={side} checked={checked} />);
  }

  return (
    <div className="rating rating-half">
      <input type="radio" name="rating-10" className="rating-hidden" />
      {starElements}
    </div>
  );
}
