import NiceModal from '@ebay/nice-modal-react'
import {createBrowserRouter, Outlet} from 'react-router-dom'
import AuthLayout from '@/layouts/auth'
import LoginPage from '@/pages/auth/login'
import DashboardLayout from '@dash-lay/index'
import ProtectedRoutes from '@/router/ProtectedRoutes'
import MeProvider from '@/modules/auth/contexts/MeProvider'
import AuthProvider from '@/modules/auth/contexts/AuthProvider'
import ModelsPage from "@/pages/models/ModelsPage";
import ModelPage from "@/pages/models/model/ModelPage";
import BannersPage from "@/pages/banners/BannersPage";


const router = createBrowserRouter([
  {
    path: '/',
    element: (
        <AuthProvider>
          <MeProvider>
            <NiceModal.Provider>
              <DashboardLayout>
                <ProtectedRoutes/>
              </DashboardLayout>
            </NiceModal.Provider>
          </MeProvider>
        </AuthProvider>
    ),
    children: [
      {
        path: '/',
        element: (<div>test home</div>),
      },
      {
        path: '/models',
        element: <Outlet/>,
        children: [
          {
            path: '/models',
            element: <ModelsPage/>,
          },
          {
            path: '/models/:modelId',
            element: <ModelPage/>,
          },
        ],
      },
      {
        path: '/banners',
        element: <BannersPage/>
      }
    ],
  },
  {
    path: '/auth',
    element: (
        <AuthProvider>
          <AuthLayout>
            <Outlet/>
          </AuthLayout>
        </AuthProvider>
    ),
    children: [
      {
        path: 'login',
        element: <LoginPage/>,
      }
    ],
  }
])

export default router