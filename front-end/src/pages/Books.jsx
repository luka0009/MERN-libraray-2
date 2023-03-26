import React, { useEffect } from "react";
import Book from "../components/Book";
import { useGetAllBooksQuery } from "../store/booksApi";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
`;

export default function Books() {
  const { data, isLoading, error, refetch } = useGetAllBooksQuery();
  console.log(data);
  useEffect(() => {
    refetch();
  }, [data]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={isLoading}
        />
      </div>
    );
  }
  return (
    <div className="bg-[#121212] bg-gradient-to-tl from-pink-800 to-purple-900 text-white mt-[-49px]">
      <div className="flex flex-col items-center justify-center mt-5">
        <h1 className="mt-3"> Any New Books? </h1>
        {/* <button>Add Book</button> */}
        <Link to="/newbook">
          <Button className="my-2" variant="success">
            {" "}
            Add new book{" "}
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data?.map((book, index) => {
          return <Book key={book._id} {...book} />;
        })}
      </div>
    </div>
  );
}
