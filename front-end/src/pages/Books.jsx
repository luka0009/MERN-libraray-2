import React, { useEffect } from "react";
import Book from "../components/Book";
import { useGetAllBooksQuery } from "../store/booksApi";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

export default function Books() {
  const { data, isLoading, error, refetch } = useGetAllBooksQuery();
  console.log(data);
  useEffect(() => {
    refetch();
  }, [data]);
  return (
    <div className="bg-blue-800 text-white mt-[-49px]">
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
