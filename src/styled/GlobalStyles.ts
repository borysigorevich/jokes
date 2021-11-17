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
`

export const theme = {
    color: {
        teal: 'teal',
        secondary: 'teal',
        lightgray: 'lightgray',
        white: 'white',
        black: 'rgba(0,0,0,.9)'
    },
    media: {
        medium: '(max-width: 767px)'
    },
    size: {
        md_nav: '5rem',
        sm_border_radius: '.25rem',
        sm_border_teal: '1px solid teal',
        lg_button: '9rem'
    }}