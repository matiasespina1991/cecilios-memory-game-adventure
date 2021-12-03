import React from "react";
import classnames from "classnames";
import pokeball from "../public/images/pokeball.png";


const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  console.log(card.image.default.src)
  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <img src={"/images/pokeball.png"} alt="pokeball" />
      </div>
      <div className="card-face card-back-face">
        <img src={card.image.default.src} alt="pokeball" />
      </div>
    </div>
  );
};

export default Card;