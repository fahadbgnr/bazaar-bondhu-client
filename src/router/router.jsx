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
import MakeAdmin from "../Pages/DashBoard/MakeAdmin/MakeAdmin";
import AllUser from "../Pages/DashBoard/AllUser/AllUser";
import AllProductsAdmin from "../Pages/DashBoard/AllProductsAdmin/AllProductsAdmin";
import AllAdvertisementsAdmin from "../Pages/DashBoard/AdminAdvertisementsTable/AdminAdvertisementsTable";
import AllOrder from "../Pages/DashBoard/AllOrder/AllOrder";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import DashboardHome from "../Pages/DashBoard/DashboardHome/DashboardHome";
import VendorRoute from "../routes/VendorRoute";
import DetailsPage from "../Pages/AllProducts/DetailsPage";
import MyOrderList from "../Pages/DashBoard/UserDashboard/MyOrderList/MyOrderList";
import Payment from "../Pages/DashBoard/UserDashboard/Payment/Payment";
import TermsAndConditions from "../Pages/Shared/Footer/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "../Pages/Shared/Footer/PtivacyPolicy/PrivacyPolicy";




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
                path: 'detailsPage/:id',
                element: <PrivateRoute>
                    <DetailsPage></DetailsPage>
                </PrivateRoute>
            },
            {
                path: 'forbidden',
                Component: Forbidden

            },
            {
                path: 'termCondition',
                Component: TermsAndConditions

            },
            {
                path: 'privacy',
                Component: PrivacyPolicy

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
                        index: true,
                        Component: DashboardHome

                    },
                    // vendor only routes
                    {
                        path: 'add-product',
                        element:
                            <VendorRoute>
                                <AddProducts></AddProducts>
                            </VendorRoute>

                    },
                    {
                        path: 'my-products',
                        element:
                            <VendorRoute>
                                <ViewMyProduct></ViewMyProduct>
                            </VendorRoute>

                    },
                    {
                        path: 'advertisements/add',
                        element:
                            <VendorRoute>
                                <AdvertisementsPage></AdvertisementsPage>
                            </VendorRoute>

                    },

                    {
                        path: 'products/update/:id',
                        element:
                            <UpdateProduct></UpdateProduct>


                    },
                    // user only routes
                    {
                        path: 'price-trends',
                        element:
                            <PriceTrendChart></PriceTrendChart>

                    },
                    {
                        path: 'manage-watchlist',
                        element:
                            <ManageWatchlist></ManageWatchlist>

                    },
                    {
                        path: 'myOrderList',
                        element: <MyOrderList></MyOrderList>
                    },
                    {
                        path: "payment/:id",
                        element: <Payment></Payment>
                    },

                    // Admin only routes
                    {
                        path: 'makeAdmin',
                        element: <AdminRoute>
                            <MakeAdmin></MakeAdmin>
                        </AdminRoute>
                    },
                    {

                        path: 'all-users',
                        element: <AdminRoute>
                            <AllUser></AllUser>
                        </AdminRoute>

                    },
                    {
                        path: 'all-products',
                        element: <AdminRoute>
                            <AllProductsAdmin></AllProductsAdmin>
                        </AdminRoute>
                    },
                    {
                        path: 'all-advertisements',
                        element: <AdminRoute>
                            <AllAdvertisementsAdmin></AllAdvertisementsAdmin>
                        </AdminRoute>

                    },
                    {
                        path: 'all-orders',
                        element: <AdminRoute>
                            <AllOrder></AllOrder>
                        </AdminRoute>
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