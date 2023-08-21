import { Box, ListItemButton, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

import React from "react";

export default function TaskBar({updateSelection}: {updateSelection: Function}) {

    const [selectedIndex, setSelectedIndex] = React.useState(1);


    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
      ) => {
        setSelectedIndex(index);
        updateSelection(index);
      };

    return(
        <div>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <ZoomOutMapOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary="Zoom" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <SearchOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Find Teams near you" />
        </ListItemButton>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Trash" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Spam" />
        </ListItemButton>
      </List>
    </Box>
        </div>
    )
}