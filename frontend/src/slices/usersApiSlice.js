import { apiSlice } from "./apiSlice";

// -'injectEndpoints' will inject these endpoints to the endpoints object of './apiSlice'.
const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: 'api/users',
                method: 'POST',
                body: data,
            })
        }),

        login: builder.mutation({
            query: (data) => ({
                url: 'api/users/auth',
                method: 'POST',
                body: data
            })
        }),

        logout: builder.mutation({
            query: () => ({
                url: 'api/users/logout',
                method: 'POST',
            })
        }),

        update: builder.mutation({
            query: (data) => ({
                url: 'api/users/profile',
                method: 'PUT',
                body: data,
            })
        })
    })
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useUpdateMutation } = usersApiSlice