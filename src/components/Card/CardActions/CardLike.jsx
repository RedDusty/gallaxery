import React from 'react';

const CardLike = ({ cardInfo, userInfo, setLike }) => {
  const countStyle = cardInfo.isLiked
    ? 'c-a-likes-count c-a-likes-count-liked'
    : 'c-a-likes-count';
  const likeStyle = cardInfo.isLiked
    ? 'c-a-likes-img c-a-likes-img-liked'
    : 'c-a-likes-img';
  const likeFillColor = cardInfo.isLiked ? '#b3ff93' : '#ffc7e3';
  const likeBorderColor = cardInfo.isLiked ? '#2fe20f' : '#ff6392';
  return (
    <div className="c-a-likes">
      <button
        className={likeStyle}
        tabIndex="21"
        onClick={() => {
          if (userInfo.uid !== '') {
            setLike(cardInfo, userInfo.uid);
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill={likeFillColor}
            d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
          />
          <path
            fill={likeBorderColor}
            d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"
          />
        </svg>
      </button>
      <p className={countStyle}>{cardInfo.likesCount}</p>
    </div>
  );
};

export default CardLike;
