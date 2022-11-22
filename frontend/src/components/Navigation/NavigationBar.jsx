import React , {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

export default function NavigationBar() {

  const [anchorEl, setAnchorEl] = useState(null);
  // Theses buttons should come from backend probablye
  const [data, setData] = useState();
  const [subs, setSubs] = useState();
  const [menuItem, setMenuItem] = useState();

  let open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch_data = async () => {
      const categoriesData = await fetch("/api/v1/article/cat/all");
      const categories = await categoriesData.json();
      const subCategoriesData = await fetch ("/api/v1/article/sub/all");
      const subs = await subCategoriesData.json();

      // Setting data to data using useState
      setData(categories);
      setSubs(subs);
    };
    fetch_data().catch(console.error);

  }, []);

  const handleMenuClick = async (event,catID) => {
    setAnchorEl(event.currentTarget);
    const list = subs.filter( (value) => {
      if( value.categoryID == catID ){
        return value;
      }
    } )
    setMenuItem(list);

  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleItemClick = (id) => {
    setAnchorEl(null);
    navigate('/result/' + id)
  }

  return (
    <Stack
      height={56} // WARN: PUT MAGIC NUMBER IS A GOOD IDEA?
      direction="row"
      width="100%"
      borderTop={1}
      borderColor="primary.dark"
      alignItems="center"
      justifyContent="space-evenly"
      backgroundColor="primary.main"
    >
      {data?data.map((value) => {
        return (
        <Stack key={value._id} width="25%" alignItems="center">
          <Button  variant="text"  onClick={(event) => handleMenuClick(event, value._id)}>
            <Typography color="text.primary">
                {value.name}
            </Typography>
          </Button>
        </Stack>
        )
      }):null}
        <Menu
          variant="menu"
          anchorEl={anchorEl}
          elevation={0}
          sx={{height: "45%"}}
          PaperProps={{
            sx: {
              backgroundColor: "page.background.primary.dark",
              color: "secondary.main",
              borderTopLeftRadius:0,
              borderTopRightRadius:0,
              borderTop:0,
              mt: 1.31,
              width: '25%',
            }
          }}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal:"center"
          }}
          transformOrigin={{
            horizontal:"center",
            vertical:"top"
          }}
        >
        {menuItem?menuItem.map( (sub) => {
          return (
            <MenuItem key={sub._id} sx={{justifyContent:"center"}} onClick={() => {handleItemClick(sub._id)}}>
              <Typography variant="h7">{ sub.name }</Typography>
            </MenuItem>
          )
        } ):null}
        </Menu>
    </Stack>
  )
}
