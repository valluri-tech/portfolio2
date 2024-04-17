"use client";
import Pagination from "@mui/material/Pagination";

export default function Table(props: any) {
  return (
    <Pagination
      count={props.totalItems / props.itemsPerPage}
      variant="outlined"
      shape="rounded"
    />
  );
}
