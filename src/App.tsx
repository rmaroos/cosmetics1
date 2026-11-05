import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { OrdersProvider } from './contexts/OrdersContext';
import { ReviewsProvider } from './contexts/ReviewsContext';
import { NavigationProvider } from './contexts/NavigationContext';

/* Storefront Shell & Pages */
import { Layout, CheckoutLayout } from './components/layout/Layout';
import { AccountLayout } from './components/account/AccountLayout';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Shop } from './pages/shop/Shop';
import { Category } from './pages/shop/Category';
import { Brands } from './pages/shop/Brands';
import { Brand } from './pages/shop/Brand';
import { Collection } from './pages/shop/Collection';
import { Collections } from './pages/shop/Collections';
import { SkinResults } from './pages/shop/SkinResults';
import { Discover } from './pages/shop/Discover';
import { Search } from './pages/shop/Search';
import { Product } from './pages/shop/Product';
import { Cart } from './pages/commerce/Cart';
import { Checkout } from './pages/commerce/Checkout';
import { OrderConfirmation } from './pages/commerce/OrderConfirmation';
import { TrackOrder } from './pages/commerce/TrackOrder';
import { Wishlist } from './pages/commerce/Wishlist';
import { Login } from './pages/account/Login';
import { Register } from './pages/account/Register';
import { ForgotPassword } from './pages/account/ForgotPassword';
import { Dashboard } from './pages/account/Dashboard';
import { Profile } from './pages/account/Profile';
import { Addresses } from './pages/account/Addresses';
import { Orders } from './pages/account/Orders';
import { OrderDetail } from './pages/account/OrderDetail';
import { AccountWishlist } from './pages/account/AccountWishlist';
import { MyReviews } from './pages/account/MyReviews';
import { Journal } from './pages/content/Journal';
import { Article } from './pages/content/Article';
import { Ingredients } from './pages/content/Ingredients';
import { About } from './pages/content/About';
import { Contact } from './pages/content/Contact';
import { Faqs } from './pages/content/Faqs';
import { InfoPage } from './pages/content/InfoPage';
import { infoPages } from './data/infoPages';

/* Dedicated Standalone Admin Panel Shell & Modules */
import { AdminLayout } from './components/admin/layout/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminBrands } from './pages/admin/AdminBrands';
import { AdminInventory } from './pages/admin/AdminInventory';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminReviews } from './pages/admin/AdminReviews';
import { AdminPromotions } from './pages/admin/AdminPromotions';
import { AdminCms } from './pages/admin/AdminCms';
import { AdminJournal } from './pages/admin/AdminJournal';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminStaff } from './pages/admin/AdminStaff';
import { AdminSettings } from './pages/admin/AdminSettings';

export function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <AuthProvider>
          <OrdersProvider>
            <ReviewsProvider>
              <WishlistProvider>
                <CartProvider>
                  <NavigationProvider>
                    <Routes>
                      {/* ─── 1. CUSTOMER-FACING STOREFRONT APPLICATION ─────── */}
                      <Route element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="shop" element={<Shop />} />
                        <Route path="category/*" element={<Category />} />
                        <Route path="brands" element={<Brands />} />
                        <Route path="brand/:slug" element={<Brand />} />
                        <Route path="collections" element={<Collections />} />
                        <Route path="collection/:slug" element={<Collection />} />
                        <Route path="discover" element={<Discover />} />
                        <Route path="skin-type/:slug" element={<SkinResults mode="type" />} />
                        <Route path="skin-concern/:slug" element={<SkinResults mode="concern" />} />
                        <Route path="search" element={<Search />} />
                        <Route path="product/:slug" element={<Product />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="wishlist" element={<Wishlist />} />
                        <Route path="order-confirmation/:reference" element={<OrderConfirmation />} />
                        <Route path="track-order" element={<TrackOrder />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                        <Route path="account" element={<AccountLayout />}>
                          <Route index element={<Dashboard />} />
                          <Route path="profile" element={<Profile />} />
                          <Route path="addresses" element={<Addresses />} />
                          <Route path="orders" element={<Orders />} />
                          <Route path="orders/:reference" element={<OrderDetail />} />
                          <Route path="wishlist" element={<AccountWishlist />} />
                          <Route path="reviews" element={<MyReviews />} />
                        </Route>
                        <Route path="journal" element={<Journal />} />
                        <Route path="journal/:slug" element={<Article />} />
                        <Route path="routines" element={<Journal kind="routine" />} />
                        <Route path="ingredients" element={<Ingredients />} />
                        <Route path="about" element={<About />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="faqs" element={<Faqs />} />
                        {infoPages.map((p) => (
                          <Route key={p.slug} path={p.slug} element={<InfoPage slug={p.slug} />} />
                        ))}
                      </Route>

                      {/* Focused Checkout */}
                      <Route element={<CheckoutLayout />}>
                        <Route path="checkout" element={<Checkout />} />
                      </Route>

                      {/* ─── 2. DEDICATED STANDALONE ADMIN PANEL APPLICATION ─── */}
                      <Route path="admin/login" element={<AdminLogin />} />
                      <Route path="admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="products" element={<AdminProducts />} />
                        <Route path="categories" element={<AdminCategories />} />
                        <Route path="brands" element={<AdminBrands />} />
                        <Route path="inventory" element={<AdminInventory />} />
                        <Route path="orders" element={<AdminOrders />} />
                        <Route path="customers" element={<AdminCustomers />} />
                        <Route path="reviews" element={<AdminReviews />} />
                        <Route path="promotions" element={<AdminPromotions />} />
                        <Route path="cms" element={<AdminCms />} />
                        <Route path="journal" element={<AdminJournal />} />
                        <Route path="reports" element={<AdminReports />} />
                        <Route path="staff" element={<AdminStaff />} />
                        <Route path="settings" element={<AdminSettings />} />
                      </Route>

                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Toaster
                      position="bottom-center"
                      toastOptions={{
                        style: { fontFamily: 'Inter, system-ui, sans-serif', borderRadius: '10px' },
                      }}
                    />
                  </NavigationProvider>
                </CartProvider>
              </WishlistProvider>
            </ReviewsProvider>
          </OrdersProvider>
        </AuthProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}
