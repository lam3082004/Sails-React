// import React from 'react';
// import { useRole } from '../hooks/useRole';

// function SidebarMenu() {
//   const { hasRole, hasAnyRole } = useRole();

//   return (
//     <ul>
//       <li>Trang chủ</li>
//       {hasAnyRole(['admin', 'superadmin', 'editor']) && (
//         <li>Quản lý sản phẩm</li>
//       )}
//       {hasAnyRole(['admin', 'superadmin']) && (
//         <li>Quản lý user</li>
//       )}
//       {hasRole('superadmin') && (
//         <li>Quản lý phân quyền</li>
//       )}
//       <li>Thông tin cá nhân</li>
//     </ul>
//   );
// }

// export default SidebarMenu; 