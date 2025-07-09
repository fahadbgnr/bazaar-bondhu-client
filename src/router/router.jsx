import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AllProducts from "../Pages/AllProducts/AllProducts";
import LogIn from "../Pages/Authentication/LogIn/LogIn";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import AddProducts from "../Pages/DashBoard/VendorDashBoard/AddProducts/AddProducts";
import ViewMyProduct from "../Pages/DashBoard/VendorDashBoard/ViewMyProduct/ViewMyProduct";
import UpdateProduct from "../Pages/DashBoard/VendorDashBoard/UpdateProduct/UpdateProduct";
import AdvertisementsPage from "../Pages/DashBoard/VendorDashBoard/AdvertisementsPage/AdvertisementsPage";
import PriceTrendChart from "../Pages/DashBoard/UserDashboard/PriceTrendChart/PriceTrendChart";
import ManageWatchlist from "../Pages/DashBoard/UserDashboard/ManageWatchlist/ManageWatchlist";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'allProducts',
                Component: AllProducts
            },
            {
                path: 'login',
                Component: LogIn
            },
            {
                path: 'signUp',
                Component: SignUp
            },
            {
                path: '/dashboard',
                element: <PrivateRoute>
                    <DashboardLayout></DashboardLayout>
                </PrivateRoute>,
                children: [
                    {
                        path: 'add-product',
                        element: <PrivateRoute>
                            <AddProducts></AddProducts>
                        </PrivateRoute>
                    },
                    {
                        path: 'my-products',
                        element: <PrivateRoute>
                            <ViewMyProduct></ViewMyProduct>
                        </PrivateRoute>
                    },
                    {
                        path: 'products/update/:id',
                        element: <PrivateRoute>
                            <UpdateProduct></UpdateProduct>
                        </PrivateRoute>

                    },
                    {
                        path: 'advertisements/add',
                        element: <PrivateRoute>
                            <AdvertisementsPage></AdvertisementsPage>
                        </PrivateRoute>
                    },
                    {
                        path: '/dashboard/price-trends',
                        element: <PrivateRoute>
                            <PriceTrendChart></PriceTrendChart>
                        </PrivateRoute>
                    },
                    {
                        path: 'manage-watchlist',
                        element: <PrivateRoute>
                            <ManageWatchlist></ManageWatchlist>
                        </PrivateRoute>
                    }
                ]
            },

        ]
    },


    {
        path: '/*',
        Component: ErrorPage,
    }
]);