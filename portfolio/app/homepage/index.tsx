"use client";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@/node_modules/next/link";

export default function HomePage() {
  const mobile = useMediaQuery("(max-width:480px)");

  const imageStyle = {
    borderRadius: "50%",
    my: "8rem",
    position: mobile ? "absolute" : "static",
    top: mobile ? "10px" : "",
    right: mobile ? "10px" : "",
    border: "3px solid #1976d282",
  };

  return (
    <>
      <Box sx={{ my: mobile ? "" : "5rem" }}>
        <Image
          src={"/profile.jpg"}
          width={mobile ? 100 : 200}
          height={mobile ? 100 : 200}
          alt="Picture of the Prakash"
          style={imageStyle}
          priority={true}
        />
      </Box>

      <LinkedInIcon
        color="secondary"
        fontSize={mobile ? "medium" : "large"}
        sx={{ cursor: "pointer" }}
      />

      <Link href="https://github.com/valluri-tech" target="_blank">
        <GitHubIcon
          color="black"
          fontSize={mobile ? "medium" : "large"}
          sx={{ cursor: "pointer" }}
        />
      </Link>

      <Box sx={{ my: mobile ? "8rem" : "" }}>
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
