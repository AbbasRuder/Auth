import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"


export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    // 'baseUrl' would have been "https://localhost:5000" if we didn't use a proxy
    baseQuery: fetchBaseQuery({ baseUrl: "" }),
    tagTypes: ["User"],
    endpoints: (builder) => ({})
    // -endpoints are defined in './usersApiSlice.js'
})

