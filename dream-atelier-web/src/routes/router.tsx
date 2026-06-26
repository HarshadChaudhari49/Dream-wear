import { createBrowserRouter, Outlet } from "react-router-dom";
import { Sidebar }         from "../shared/components/Sidebar";
import { ProtectedRoute }  from "../shared/components/ProtectedRoute";

import { HomePage }           from "../features/home/pages/HomePage";
import { LoginPage }          from "../features/auth/pages/LoginPage";
import { ExplorePage }        from "../features/catalog/pages/ExplorePage";
import { ProductDetailPage }  from "../features/catalog/pages/ProductDetailPage";
import { ShowcaseFeedPage }   from "../features/dreams/pages/ShowcaseFeedPage";
import { DreamInputPage }     from "../features/dreams/pages/DreamInputPage";
import { MyDreamsPage }       from "../features/dreams/pages/MyDreamsPage";
import { DreamDetailPage }    from "../features/dreams/pages/DreamDetailPage";
import { CartPage }           from "../features/orders/pages/CartPage";
import { CheckoutPage }       from "../features/orders/pages/CheckoutPage";
import { OrdersPage }         from "../features/orders/pages/OrdersPage";
import { ProfilePage }        from "../features/wardrobe/pages/ProfilePage";

function Layout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FFFBF7" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0, overflowX: "hidden" }}>
        <Outlet />
      </div>
    </div>
  );
}

function Private({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Public
      { index: true,          element: <HomePage /> },
      { path: "login",        element: <LoginPage /> },
      { path: "explore",      element: <ExplorePage /> },
      { path: "explore/:id",  element: <ProductDetailPage /> },
      { path: "dreams",       element: <ShowcaseFeedPage /> },

      // Requires login
      { path: "dreams/new",   element: <Private><DreamInputPage /></Private> },
      { path: "dreams/mine",  element: <Private><MyDreamsPage /></Private> },
      { path: "dreams/:id",   element: <Private><DreamDetailPage /></Private> },
      { path: "cart",         element: <Private><CartPage /></Private> },
      { path: "checkout",     element: <Private><CheckoutPage /></Private> },
      { path: "orders",       element: <Private><OrdersPage /></Private> },
      { path: "profile",      element: <Private><ProfilePage /></Private> },
    ],
  },
]);
