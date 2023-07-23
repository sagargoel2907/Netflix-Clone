import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import Browse from "./pages/Browse";
import Layout from "./components/Layout";

function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route path="/" element={<h1>Default view</h1>} />
        <Route path="/login" element={<h2>Login page</h2>} />
        <Route path="/browse" element={<Layout/>}>
          <Route index element={<Browse />}></Route>
        </Route>
        <Route path="/latest" element={<Layout/>}>
          <Route index element={<h1>latest</h1>}></Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
}
export default function App() {
  return <AppRouter />;
}
