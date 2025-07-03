// 'use client';

// import React from 'react';
// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   ColumnDef,
// } from '@tanstack/react-table';
// import {
//   Card,
//   CardContent,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Badge } from "@/components/ui/badge";
// import { useRouter } from 'next/navigation';

// const CategoriesTable = () => {
//   const [categories, setCategories] = React.useState<any[]>([]);
//   const [expandedRows, setExpandedRows] = React.useState<Record<string, boolean>>({});
//   const router = useRouter();

//   React.useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/v1/categories/list-categories');
//         const result = await response.json();
//         setCategories(result.data || []);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const toggleRow = (id: string) => {
//     setExpandedRows(prev => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const normalizedData = React.useMemo(() => {
//     return categories.map((cat) => ({
//       id: cat.category_id,
//       name: cat.category_name,
//       slug: cat.category_slug,
//       description: cat.category_description || "No description",
//       image: cat.category_img_thumbnail
//         ? `${cat.category_img_thumbnail}`
//         : 'https://via.placeholder.com/40x40?text=C',
//       status: cat.category_status ? 'active' : 'inactive',
//       type: 'category',
//       subcategories: (cat.subcategories || []).map((sub) => ({
//         id: sub.subcategory_id,
//         parentId: cat.category_id,
//         name: sub.subcategory_name,
//         slug: sub.subcategory_slug,
//         description: sub.subcategory_description || "No description",
//         image: sub.subcategory_img_thumbnail
//           ? `${sub.subcategory_img_thumbnail}`
//           : 'https://via.placeholder.com/40x40?text=S',
//         status: sub.subcategory_status ? 'active' : 'inactive',
//         type: 'subcategory',
//       })),
//     }));
//   }, [categories]);

//   const data = React.useMemo(() => {
//     const flatData = [];
//     for (const category of normalizedData) {
//       flatData.push(category);
//       if (expandedRows[category.id] && Array.isArray(category.subcategories)) {
//         flatData.push(...category.subcategories);
//       }
//     }
//     return flatData;
//   }, [normalizedData, expandedRows]);

//   const columns = React.useMemo<ColumnDef<any>[]>(
//     () => [
//       {
//         accessorKey: 'id',
//         header: 'ID',
//         cell: ({ row }) => <span>{row.original.id}</span>,
//       },
//       {
//         accessorKey: 'name',
//         header: 'Name',
//         cell: ({ row }) => {
//           const isCategory = row.original.type === 'category';
//           return (
//             <div className="flex items-center space-x-3">
//               <img
//                 src={row.original.image}
//                 alt={row.original.name}
//                 className="w-10 h-10 rounded-md object-cover shadow"
//               />
//               <span className="font-medium text-sm md:text-base">{row.original.name}</span>
//               {isCategory && row.original.subcategories?.length > 0 && (
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => toggleRow(row.original.id)}
//                   className='cursor-pointer'
//                 >
//                   {expandedRows[row.original.id] ? (
//                     <ChevronDown className="w-4 h-4" />
//                   ) : (
//                     <ChevronRight className="w-4 h-4" />
//                   )}
//                 </Button>
//               )}
//             </div>
//           );
//         },
//       },
//       {
//         accessorKey: 'slug',
//         header: 'Slug',
//       },
//       {
//         accessorKey: 'description',
//         header: 'Description',
//       },
//       {
//         accessorKey: 'status',
//         header: 'Status',
//         cell: ({ row }) => (
//           <Badge variant={row.original.status === 'active' ? 'default' : 'outline'}>
//             {row.original.status}
//           </Badge>
//         ),
//       },
//       {
//   id: 'actions',
//   header: 'Actions',
//   cell: ({ row }) => 
//      (
//       <Button
//         variant="outline"
//         size="sm"
//         onClick={() => router.push(`/Categories/AddCategory?id=${row.original.id}`)}
//       >
//         Edit
//       </Button>
//     ) 
  
// },

//     ],
//     [expandedRows]
//   );

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getRowId: (row) => `${row.type}-${row.id}`,
//   });

//   return (
//     <div>
//       <div className='flex justify-between p-4 items-center'>
//         <h1 className='text-3xl font-medium'>Categories</h1>
//         <Button onClick={() => router.push('/Categories/AddCategory')} className='cursor-pointer'>
//           Add Category
//         </Button>
//       </div>

//       <Card className="mt-6 shadow-xl">
//         <CardContent className="p-0 overflow-x-auto">
//           <Table className="min-w-full text-sm md:text-base">
//             <TableHeader>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <TableHead key={header.id} className="bg-gray-100 text-gray-600">
//                       {flexRender(header.column.columnDef.header, header.getContext())}
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableHeader>

//             <TableBody>
//               <AnimatePresence initial={false}>
//                 {table.getRowModel().rows.map((row) => (
//                   <motion.tr
//                     key={row.id}
//                     layout
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     exit={{ opacity: 0, height: 0 }}
//                     className={row.original.type === 'subcategory' ? 'bg-gray-50' : ''}
//                   >
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell
//                         key={cell.id}
//                         className={`px-4 py-3 ${row.original.type === 'subcategory' ? 'pl-10' : ''}`}
//                       >
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </TableCell>
//                     ))}
//                   </motion.tr>
//                 ))}
//               </AnimatePresence>
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default CategoriesTable;


'use client';

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
const CategoriesTable = () => {
  const [categories, setCategories] = React.useState<any[]>([]);
  const [expandedRows, setExpandedRows] = React.useState<Record<string, boolean>>({});
const [switchOpen, setSwitchOpen] = React.useState(false);
const [selectedRow, setSelectedRow] = React.useState<any | null>(null);
const [desiredStatus, setDesiredStatus] = React.useState<'active' | 'inactive' | null>(null);


  const router = useRouter();
 const fetchCategories = async () => {
      try {
        const response = await axiosInstance('/api/v1/categories/list-categories');
      
        setCategories(response.data .data|| []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  React.useEffect(() => {
   

    fetchCategories();
  }, []);

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


const updateCategoryStatus = async (id: string, status: 'active' | 'inactive') => {
  const endpoint =
    status === 'active'
      ? `/api/v1/categories_or_subcategories_by_id/restore/${id}`       // PATCH for restore
      : `/api/v1/categories_or_subcategories_by_id/soft-delete/${id}`;  // DELETE for soft delete

  try {
    if (status === 'active') {
      await axiosInstance.put(endpoint); // Restore → PATCH
    } else {
      await axiosInstance.delete(endpoint); // Soft delete → DELETE
    }

    toast.success(`Category ${status === 'active' ? 'activated' : 'deactivated'} successfully`);
fetchCategories();
    // Update local UI state
    setCategories((prev) =>
      prev.map((cat) =>
        cat.category_id === id
          ? { ...cat, category_status: status === 'active' }
          : cat
      )
    );
  } catch (error) {
    toast.error('Failed to update status');
  } finally {
    setSwitchOpen(false);
    setSelectedRow(null);
    setDesiredStatus(null);
  }
};

  const normalizedData = React.useMemo(() => {
    return categories.map((cat) => ({
      id: cat.category_id,
      name: cat.category_name,
      slug: cat.category_slug,
      description: cat.category_description || "No description",
      image: cat.category_img_thumbnail
        ? `${cat.category_img_thumbnail}`
        : 'https://via.placeholder.com/40x40?text=C',
      status: cat.category_status ? 'inactive' : 'active',
      type: 'category',
      subcategories: (cat.subcategories || []).map((sub) => ({
        id: sub.subcategory_id,
        parentId: cat.category_id,
        name: sub.subcategory_name,
        slug: sub.subcategory_slug,
        description: sub.subcategory_description || "No description",
        image: sub.subcategory_img_thumbnail
          ? `${sub.subcategory_img_thumbnail}`
          : 'https://via.placeholder.com/40x40?text=S',
        status: sub.subcategory_status ? 'inactive' : 'active',
        type: 'subcategory',
      })),
    }));
  }, [categories]);

  const data = React.useMemo(() => {
    const flatData = [];
    for (const category of normalizedData) {
      flatData.push(category);
      if (expandedRows[category.id] && Array.isArray(category.subcategories)) {
        flatData.push(...category.subcategories);
      }
    }
    return flatData;
  }, [normalizedData, expandedRows]);

  const columns = React.useMemo<ColumnDef<any>[]>(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <span>{row.original.id}</span>,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        const isCategory = row.original.type === 'category';
        return (
          <div className="flex items-center space-x-3">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-10 h-10 rounded-md object-cover shadow"
            />
            <span className="font-medium text-sm md:text-base">{row.original.name}</span>
            {isCategory && row.original.subcategories?.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleRow(row.original.id)}
                className='cursor-pointer'
              >
                {expandedRows[row.original.id] ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'slug',
      header: 'Slug',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
{
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const isCategory = row.original.type === 'category';
    const isActive = row.original.status === 'active';

    // Prevent subcategory activation if parent is inactive
const isParentInactive =
  row.original.type === 'subcategory' &&
  normalizedData.find(cat => cat.id === row.original.parentId)?.status === 'inactive';;

const isDisabled = isParentInactive;


  
    return isCategory || row.original.type === 'subcategory' ? (
      <div className="flex items-center gap-2">
        <Switch
          checked={isActive}
          disabled={isDisabled}
          onCheckedChange={(checked) => {
            setSelectedRow(row.original);
            setDesiredStatus(checked ? 'active' : 'inactive');
            setSwitchOpen(true);
          }}
        />
        <span className="text-sm capitalize">
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
    ) : (
      <Badge variant={isActive ? 'default' : 'outline'}>
        {row.original.status}
      </Badge>
    );
  },
},




    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/Categories/AddCategory?id=${row.original.id}`)}
            disabled={row.original.status === 'inactive'}
          >
            Edit
          </Button>

       
        </div>
      ),
    },
  ], [expandedRows]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => `${row.type}-${row.id}`,
  });

  return (
    <div>
      <div className='flex justify-between p-4 items-center'>
        <h1 className='text-3xl font-medium'>Categories</h1>
        <Button onClick={() => router.push('/Categories/AddCategory')} className='cursor-pointer'>
          Add Category
        </Button>
      </div>

      <Card className="mt-6 shadow-xl">
        <CardContent className="p-0 overflow-x-auto">
          <Table className="min-w-full text-sm md:text-base">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="bg-gray-100 text-gray-600">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              <AnimatePresence initial={false}>
                {table.getRowModel().rows.map((row) => (
                  <motion.tr
                    key={row.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={row.original.type === 'subcategory' ? 'bg-gray-50' : ''}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={`px-4 py-3 ${row.original.type === 'subcategory' ? 'pl-10' : ''}`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
  <AlertDialog open={switchOpen} onOpenChange={setSwitchOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Change Status</AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure you want to{' '}
        <span className="font-semibold">{desiredStatus}</span>{' '}
        this {selectedRow?.type}?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel
        onClick={() => {
          setSwitchOpen(false);
          setSelectedRow(null);
          setDesiredStatus(null);
        }}
      >
        Cancel
      </AlertDialogCancel>
      <AlertDialogAction
        onClick={async () => {
          if (!selectedRow || !desiredStatus) return;

          // Prevent activating subcategory if parent is inactive
          if (
            selectedRow.type === 'subcategory' &&
            desiredStatus === 'active'
          ) {
            const parent = categories.find(
              (cat) => cat.category_id === selectedRow.parentId
            );
            console.log(parent)
            if (parent?.category_status) {
              toast.error('Cannot activate subcategory while parent is inactive');
              setSwitchOpen(false);
              setSelectedRow(null);
              setDesiredStatus(null);
              return;
            }
          }

          await updateCategoryStatus(selectedRow.id, desiredStatus);
        }}
      >
        Confirm
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


    </div>
  );
};

export default CategoriesTable;
