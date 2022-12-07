import likeIcon from '../../../assets/like.svg';
import dislikeIcon from '../../../assets/dislike.svg';
import { API_IMAGES } from '../../../utils/consts';

import './animeReviewItem.scss';

const AnimeReviewItem = (review) => {
    const { username, image } = review.from;
    const { description, likes, dislikes, _id, createdAt } = review;

    return (
        <div className="reviews__item">
            <div className="reviews__image">
                <img src={`${API_IMAGES}/${image}`} alt="User" />
            </div>
            <div className="reviews__content">
                <p className="reviews__username">{username}</p>
                <p className="reviews__description">{description}</p>
                <div className="reviews__btns">
                    <button className="reviews__answer">Ответить </button>
                    <button className="reviews__like">
                        <img src={likeIcon} alt="Likes" />
                        <span>{likes}</span>
                    </button>
                    <button className="reviews__dislike">
                        <img src={dislikeIcon} alt="DisLikes" />
                        <span>{dislikes}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default AnimeReviewItem;
