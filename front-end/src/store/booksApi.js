import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => '/getbooks',
      providesTags: ["books"],
    }),
    getSingleBook: builder.query({
      query: (id) => `/getbook/${id}`,
      providesTags: ["books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, update }) => ({
        url: `/update/${id}`,
        method: "PATCH",
        body: update,
      }),
      invalidatesTags: ["books"],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const { useGetAllBooksQuery, useDeleteBookMutation, useGetSingleBookQuery, useUpdateBookMutation, useAddBookMutation } = booksApi;