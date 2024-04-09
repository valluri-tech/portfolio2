"use client";
import Link from "@/node_modules/next/link";
import { Button, Box, Menu, MenuItem, Typography } from "@mui/material";

import styles from "./index.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useState } from "react";

export default function NavBar() {
  const mobile = useMediaQuery("(max-width:480px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  if (mobile) {
    return (
      <>
        <nav
          className={styles.navMobile}
          onClick={handleClick}
          aria-haspopup="true"
          aria-expanded={open ? "true" : "false"}
          aria-controls={open ? "popup-menu" : undefined}
          id="mobile-menu-icon"
        >
          <Box sx={{ cursor: "pointer" }}>
            <MenuRoundedIcon fontSize="large" color="primary" />
          </Box>
        </nav>
        <Menu
          anchorEl={anchorEl}
          onClose={handleClose}
          open={open}
          id="popup-menu"
          MenuListProps={{ "aria-labelledby": "mobile-menu-icon" }}
        >
          <MenuItem onClick={handleClose}>
            {" "}
            <Link style={{ textDecoration: "none" }} href="/">
              <Typography variant={"body1"} color="primary.main">
                {" "}
                Home
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link style={{ textDecoration: "none" }} href="/experience">
              <Typography variant={"body1"} color="primary.main">
                {" "}
                Experience
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            {" "}
            <Link style={{ textDecoration: "none" }} href="/skills">
              <Typography variant={"body1"} color="primary.main">
                {" "}
                Skills
              </Typography>
            </Link>
          </MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <nav className={styles.nav}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Link href="/">
          <Button variant="contained">Home</Button>
        </Link>
        <Link href="/experience">
          <Button variant="contained">Experience</Button>
        </Link>
        <Link href="/skills">
          <Button variant="contained">Skill</Button>
        </Link>
      </Box>
    </nav>
  );
}
