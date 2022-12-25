import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useUserService } from '../../../services/auth/user.service';
import { fetchReviews } from '../../../slices/animeSlice';
import { LOADING } from '../../../utils/consts';
import Spinner from '../../common/spinner/Spinner';
import AnimeReviewItem from '../animeReviewItem/AnimeReviewItem';

import './animeReviews.scss';

const AnimeReviews = () => {
	const { id } = useParams();
	const [text, setText] = useState('');

	const { createReview } = useUserService();

	const dispatch = useDispatch();

	const user = useSelector((state) => state.global.user);
	const reviews = useSelector((state) => state.anime.reviews);
	const reviewsLoadingStatus = useSelector((state) => state.anime.reviewsLoadingStatus);
	const updateReviewLoadingStatus = useSelector((state) => state.global.updateReviewLoadingStatus);

	useEffect(() => {
		dispatch(fetchReviews(id));
	}, [id, dispatch, updateReviewLoadingStatus]);

	if (updateReviewLoadingStatus === LOADING) {
		return <Spinner small />;
	}
	if (reviewsLoadingStatus === LOADING) {
		return <Spinner small />;
	}

	if (!reviews) {
		return <h3>Произошла ошибка</h3>;
	}

	const handleSubmit = () => {
		createReview(id, text);
		setText('');
	};

	const renderReviews = (reviews) => {
		return reviews.map(({ _id, ...props }) => <AnimeReviewItem key={_id} _id={_id} {...props} />);
	};

	const renderedReviews = renderReviews(reviews);
	return (
		<div className="reviews">
			<h2 className="reviews__title">Комментарии</h2>
			{user && <TextAreaLayout handleSubmit={handleSubmit} setText={setText} />}
			<div className="reviews__list">{renderedReviews}</div>
		</div>
	);
};
export default AnimeReviews;

const TextAreaLayout = ({ handleSubmit, setText }) => {
	return (
		<>
			<textarea
				onChange={(e) => setText(e.target.value)}
				className="reviews__text-area"
				name="review"
				id="review"
				placeholder="Оставьте комментарий...."
			></textarea>
			<button onClick={handleSubmit} className="reviews__submit">
				Оставить
			</button>
		</>
	);
};
