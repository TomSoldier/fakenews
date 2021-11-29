import { EuiButtonIcon, EuiFieldSearch } from '@elastic/eui';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Search = () => {
	const navigate = useNavigate();
	const [value, setValue] = useState<string>('');
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleClick = () => {
		navigate('/search', { state: { value: value } });
	};

	return (
		<EuiFieldSearch
			onChange={handleChange}
			value={value}
			append={
				<EuiButtonIcon
					aria-label='search'
					onClick={handleClick}
					iconType='search'
				/>
			}
		/>
	);
};

export default Search;
