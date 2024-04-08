"use client";
import Image from "next/image";
import { Box } from "@mui/material";

const imageStyle = {
  borderRadius: "50%",
  border: "1px solid #fff",
};

export default function HomePage() {
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
