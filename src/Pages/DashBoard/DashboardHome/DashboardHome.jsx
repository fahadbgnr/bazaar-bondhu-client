import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import Loading from '../../../components/Loading';
import Forbidden from '../../Forbidden/Forbidden';
import VendorDashboard from './VendorDashboard';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';


const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Loading></Loading>
    }

    if(role === 'user'){
        return <UserDashboard></UserDashboard>
    }
    else if(role === 'vendor'){
        return <VendorDashboard></VendorDashboard>
    }
    else if(role ==='admin'){
        return <AdminDashboard></AdminDashboard>
    }
    else {
        return <Forbidden></Forbidden>
    }

};

export default DashboardHome;