import { Star, StarHalf } from "lucide-react";

type RatingProps = {
  rate: number
  stars?: number
}

export default function Rating({ rate, stars = 5 }: RatingProps) {
  const value = Math.max(0, Math.min(rate, stars));
  const halfStars = Math.floor((value * 2));
  const wholeStars = Math.floor((halfStars/2));
  const endHalfStar = halfStars % 2 === 1;

  return (
    <div className="relative">
      <div className="flex">
        {Array.from({ length: stars }, (_, k) => (
          <Star fill="#111" strokeWidth={0} key={k} />
        ))}
      </div>
      <div className="absolute top-0 left-0 flex">
        {Array.from({ length: wholeStars }, (_, k) => (
          <Star fill="yellow" strokeWidth={0} key={k} />
        ))}
        { endHalfStar && <StarHalf fill="yellow" strokeWidth={0} /> }
      </div>
    </div>
  );
}
