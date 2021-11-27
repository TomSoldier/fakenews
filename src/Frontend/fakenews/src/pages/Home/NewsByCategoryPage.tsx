import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseURL, endpoints } from '../../configuration/api';
import { CategoryDto } from '../../models/DTO/CategoryDto';
import { eventActions } from '../../redux/actions/eventActions';
import { useAppDispatch } from '../../redux/hooks';
import {
	createEvent,
	FakeNewsEventType,
} from '../../services/events/fakeNewsEvent';
import httpClient from '../../services/http/http';

const NewsByCategoryPage = () => {
	const [category, setCategory] = useState<CategoryDto>();
	const params = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const getCategory = async () => {
			try {
				const response = await httpClient.get<CategoryDto>(
					baseURL + `${endpoints.Categories.categories}/${params.id}`
				);
				setCategory(response.data);
			} catch (error) {
				dispatch(
					eventActions.addEvent(
						createEvent(
							FakeNewsEventType.RequestFailed,
							`Failed to fetch category with id: ${params.id}`
						)
					)
				);
				navigate('/notfound');
			}
		};

		getCategory();
	}, [dispatch, navigate, params.id]);

	return category ? <>{category.name}</> : <>szar</>;
};

export default NewsByCategoryPage;
