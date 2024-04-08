"use client";
import Link from "@/node_modules/next/link";
import { Button, Box, Menu, MenuItem } from "@mui/material";

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
        <nav className={styles.navMobile} onClick={handleClick}>
          <Box sx={{ cursor: "pointer" }}>
            <MenuRoundedIcon fontSize="large" color="primary" />
          </Box>
        </nav>
        <Menu anchorEl={anchorEl} onClose={handleClose} open={open}>
          <MenuItem onClick={handleClose}>
            {" "}
            <Link style={{ textDecoration: "none" }} href="/">
              Home{" "}
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link style={{ textDecoration: "none" }} href="/experience">
              Experience{" "}
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            {" "}
            <Link style={{ textDecoration: "none" }} href="/skills">
              Skill
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
