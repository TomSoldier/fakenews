import {
	EuiSelectableTemplateSitewide,
	EuiHeaderSectionItemButton,
	EuiIcon,
	EuiSelectableMessage,
} from '@elastic/eui';
import React from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
	return (
		<EuiSelectableTemplateSitewide
			options={[]}
			searchProps={{
				append: '⌘K',
				compressed: true,
			}}
			popoverButton={
				<EuiHeaderSectionItemButton
					aria-label='Sitewide search'
					style={{ marginRight: 10 }}
				>
					<EuiIcon type='search' size='m' />
				</EuiHeaderSectionItemButton>
			}
			popoverButtonBreakpoints={['xs', 's']}
			popoverProps={{
				repositionOnScroll: true, // Necessary when placing search in a fixed component
			}}
			emptyMessage={
				<EuiSelectableMessage style={{ minHeight: 300 }}>
					<p>
						Please see the component page for{' '}
						<Link to='/forms/selectable'>
							<strong>EuiSelectableTemplateSitewide</strong>
						</Link>{' '}
						on how to configure your sitewide search.
					</p>
				</EuiSelectableMessage>
			}
		/>
	);
};

export default Search;
