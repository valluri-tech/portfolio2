"use client";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@/node_modules/next/link";
import { useEffect } from "react";


const ProfileImage = () => {
  const mobile = useMediaQuery("(max-width:480px)");

  let imageStyle = {
    borderRadius: "50%",
    margin: mobile ? "1rem 0" : "4rem 0",
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
  };

  if (mobile) {
    return (
      <Box
        sx={{
          position: "absolute",
          right: "1rem",
          top: "0rem",
        }}
      >
        <Image
          src={"/profile.jpg"}
          width={mobile ? 100 : 200}
          height={mobile ? 100 : 200}
          alt="Picture of the Prakash"
          style={imageStyle}
          priority={true}
        />
      </Box>
    );
  }
  return (
    <Image
      src={"/profile.jpg"}
      width={mobile ? 100 : 200}
      height={mobile ? 100 : 200}
      alt="Picture of the Prakash"
      style={imageStyle}
      priority={true}
    />
  );
};

const ProfileLinks = () => {
  const largeDesktop = useMediaQuery("(min-width:1200px)");
  const desktop = useMediaQuery("(min-width:992px)");
  const mobile = useMediaQuery("(max-width:480px)");
  let containerStyles = {
    my: mobile ? "5rem" : "",
    // border: "1px solid red",
    width: largeDesktop ? "10%" : desktop ? "15%" : "20%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "1.5rem",
  };

  if (mobile) {
    containerStyles = {
      ...containerStyles,
      ...{ position: "absolute", right: "2rem", top: "3.5rem", width: "21%" },
    };
  }

  return (
    <Box sx={containerStyles}>
      <Link href="https://linkedin.com/in/valluri-satya" target="_blank">
        <LinkedInIcon
          color="secondary"
          fontSize={mobile ? "medium" : "large"}
          sx={{ cursor: "pointer" }}
        />
      </Link>

      <Link href="https://github.com/valluri-tech" target="_blank">
        <GitHubIcon
          fontSize={mobile ? "medium" : "large"}
          sx={{ cursor: "pointer" }}
        />
      </Link>
    </Box>
  );
};

export default function HomePage() {
  const mobile = useMediaQuery("(max-width:480px)");

  return (
    <>
      <ProfileImage />
      <ProfileLinks />
      <Box sx={{ my: mobile ? "8rem" : "3rem" }}>
        <Typography
          component="h1"
          variant={mobile ? "h5" : "h4"}
          color="primary.main"
        >
          Prakash is working as a Senior Software engineer at Slalom Build.
        </Typography>
        <Typography
          component="h2"
          variant="h6"
          sx={{ my: "2rem" }}
          color="primary.main"
        >
          He started his career in web development as a front end engineer and
          involved himself in not just backend development but also into coding
          pipelines using his bash skills.
        </Typography>
        <Typography
          component="h2"
          variant="h6"
          sx={{ my: "2rem" }}
          color="primary.main"
        >
          During his free time, Prakash would like to solve data structure
          problems, or learn more about machine learning and understand how he
          can help companies make the most out of it.
        </Typography>
      </Box>
    </>
  );
}
