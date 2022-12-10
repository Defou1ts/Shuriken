import { API_IMAGES } from '../../../utils/consts';
import { useLog } from '../../../services/logService/log.service';
import { useUserService } from '../../../services/auth/user.service';

import likeIcon from '../../../assets/like.svg';
import dislikeIcon from '../../../assets/dislike.svg';
import './animeReviewItem.scss';

const AnimeReviewItem = (review) => {
	const { logDate } = useLog();
	const { likeReview, disLikeReview } = useUserService();

	const { username, image } = review.from[0];
	const { description, likes, dislikes, _id, createdAt } = review;

	const timeRenderOptions = {
		hour: 'numeric',
		minute: 'numeric',
		month: 'numeric',
	};

	const renderedDate = logDate(new Date(createdAt), timeRenderOptions);

	return (
		<div className="reviews__item">
			<div className="reviews__image">
				<img src={`${API_IMAGES}/${image}`} alt="User" />
			</div>
			<div className="reviews__content">
				<p className="reviews__username">
					{username} <span className="reviews__date">{renderedDate}</span>
				</p>
				<p className="reviews__description">{description}</p>
				<div className="reviews__btns">
					<button className="reviews__answer">Ответить </button>
					<button className="reviews__like">
						<img src={likeIcon} alt="Likes" onClick={() => likeReview(_id)} />
						<span>{likes}</span>
					</button>
					<button className="reviews__dislike">
						<img src={dislikeIcon} alt="DisLikes" onClick={() => disLikeReview(_id)} />
						<span>{dislikes}</span>
					</button>
				</div>
			</div>
		</div>
	);
};
export default AnimeReviewItem;
