import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1170px;
  padding: 10px 16px;
  margin: 0 auto;
`

export const Select = styled.select`
  margin-bottom: 10px;
  margin-right: 5px;
  padding: 3px;
  border: 1px solid teal;
  border-radius: 4px;
  
  &:focus {
    outline: none;
  }
`

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  padding-left: 0;

  li {
    border: 1px solid teal;
    border-radius: 4px;
    padding: 3px 5px;
  }
`

export const Input = styled.input`
  display: block;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  margin-bottom: 10px;
  width: 230px;
  padding: 3px 6px;
  border: 1px solid teal;
  border-radius: 4px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  
  &:focus {
    outline: none;
  }
`

export const Button = styled.button`
  position: relative;
  left: 50%;
  transform: translate(-50%);
  padding: 5px 16px;
  border-radius: 5px;
  border: none;
  background-color: teal;
  color: #fff;
  cursor: pointer;
`
