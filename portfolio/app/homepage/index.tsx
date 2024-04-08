"use client";
import Image from "next/image";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function HomePage() {
  const mobile = useMediaQuery("(max-width:480px)");

  const imageStyle = {
    borderRadius: "50%",
    my: "8rem",
    position: mobile ? "absolute" : "static",
    top: mobile ? "10px" : "",
    right: mobile ? "10px" : "",
  };

  if (mobile) {
    return (
      <Image
        src={"/profile.jpg"}
        width={100}
        height={100}
        alt="Picture of the Prakash"
        style={imageStyle}
        priority={true}
      />
    );
  }

  return (
    <Box sx={{ my: "8rem" }}>
      <Image
        src={"/profile.jpg"}
        width={200}
        height={200}
        alt="Picture of the Prakash"
        style={imageStyle}
        priority={true}
      />
    </Box>
  );
}
