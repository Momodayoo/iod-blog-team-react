import { styled } from "@mui/material/styles";

const Item = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}));

const GridItem = ({ children }) => {
  return (
    <Item>
      {children}
    </Item>
  );
}

export default GridItem;
