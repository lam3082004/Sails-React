const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My CMS</h1>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-blue-200">Dashboard</a>
          <a href="#" className="hover:text-blue-200">Products</a>
          <a href="#" className="hover:text-blue-200">Orders</a>
        </nav>
        <div className="flex items-center space-x-4">
          <span className="hidden md:inline">Admin</span>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">A</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;