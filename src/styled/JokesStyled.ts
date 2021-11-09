import styled from 'styled-components'
import {Button, Nav, Popover} from 'react-bootstrap';

export const Styles = styled.div`
  .border-secondary {
    border-color: ${props => props.theme.color.secondary} !important;
  }

  .bg-secondary {
    background-color: ${props => props.theme.color.secondary} !important;
  }

  .btn-secondary {
    background-color: ${props => props.theme.color.secondary};
    border: none;
  }
  
  .popover-body {
    color: ${props => props.theme.color.teal}
  }
`

export const CustomButton = styled(Button)`
  width: ${props => props.theme.size.lg_button}
`

export const CustomNavLink = styled(Nav.Link)`
  border: ${props => props.theme.size.sm_border_teal};
  width: ${props => props.theme.size.md_nav};
  border-radius: ${props => props.theme.size.sm_border_radius};
  text-decoration: none;
  color: ${props => props.theme.color.black};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color .3s ease;

  &:hover {
    background-color: ${props => props.theme.color.teal};
    color: ${props => props.theme.color.white}
  }
`

export const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`