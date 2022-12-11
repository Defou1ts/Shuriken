import { API_IMAGES } from '../../../utils/consts';
import { useLog } from '../../../services/logService/log.service';
import { useUserService } from '../../../services/auth/user.service';

import likeIcon from '../../../assets/like.svg';
import dislikeIcon from '../../../assets/dislike.svg';
import activeDislike from '../../../assets/activeDisLike.svg';
import activeLike from '../../../assets/activeLike.svg';

import './animeReviewItem.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const AnimeReviewItem = (review) => {
	const { logDate } = useLog();
	const { likeReview, disLikeReview } = useUserService();

	const [likeSrc, setLikeSrc] = useState(likeIcon);
	const [dislikeSrc, setDislikeSrc] = useState(dislikeIcon);

	const { username, image } = review.from[0];
	const { description, likes, dislikes, _id, createdAt } = review;

	const likedComments = useSelector((state) => state.global.user?.likedComments);
	const disLikedComments = useSelector((state) => state.global.user?.disLikedComments);

	console.log(likedComments);

	useEffect(() => {
		if (likedComments) {
			for (const commentId of likedComments) {
				if (commentId === _id) {
					setLikeSrc(activeLike);
				}
			}
		}
	}, [likedComments, _id]);

	useEffect(() => {
		if (disLikedComments) {
			for (const commentId of disLikedComments) {
				if (commentId === _id) {
					setDislikeSrc(activeDislike);
				}
			}
		}
	}, [disLikedComments, _id]);

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
						<img src={likeSrc} alt="Likes" onClick={() => likeReview(_id)} />
						<span>{likes}</span>
					</button>
					<button className="reviews__dislike">
						<img src={dislikeSrc} alt="DisLikes" onClick={() => disLikeReview(_id)} />
						<span>{dislikes}</span>
					</button>
				</div>
			</div>
		</div>
	);
};
export default AnimeReviewItem;
