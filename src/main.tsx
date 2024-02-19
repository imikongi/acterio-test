import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home/Home.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Posts from "./pages/Posts/Posts.tsx";
import {setupStore} from "./store/store.ts";
import {Provider} from "react-redux";
import ErrorPage from "./pages/Error/ErrorPage.tsx";
import Post from "./pages/Post/Post.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element:  <Home />,
        errorElement: <ErrorPage/>
    },
    {
        path: '/posts',
        element: <Posts />
    },
    {
        path: '/posts/:postId',
        element: <Post/>
    }
])

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
