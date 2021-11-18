import {createGlobalStyle} from 'styled-components';

export const Global = createGlobalStyle`
  * {
    font-family: 'Nunito', sans-serif;
  }

  .list-group li {
    cursor: pointer;
  }

  .link {
    color: inherit;
    text-decoration: none;
  }
`;

export const theme = {
	color: {
		teal: 'teal',
		secondary: 'teal',
		lightgray: 'lightgray',
		white: 'white',
		black: 'rgba(0,0,0,.9)'
	},
	media: {
		extra_small: '(max-width: 575px)',
		small: '(min-width: 576px) and (max-width: 767px)',
		medium: '(min-width: 767px) and (max-width: 991px)',
		large: '(min-width: 992px) and (max-width: 1199px)',
		x_large: '(min-width: 1200px) and (max-width: 1399px)',
		xx_large: '(min-width: 1400px)'
	},
	size: {
		md_nav: '5rem',
		sm_border_radius: '.25rem',
		sm_border_teal: '1px solid teal',
		lg_button: '9rem'
	}
};
