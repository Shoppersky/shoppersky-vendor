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
const CategoriesTable = () => {
  const [expandedRows, setExpandedRows] = React.useState<Record<number, boolean>>({});
  const router=useRouter()
  const toggleRow = (id: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const mockCategories = React.useMemo(() => [
    {
      id: 1,
      name: 'Movies',
      slug: 'movies',
      description: 'Latest blockbuster releases and indie gems.',
      image: 'https://images.unsplash.com/photo-1609333008043-77e7d3dbfc47?auto=format&fit=crop&w=600&q=80',
      status: 'active',
      subcategories: [
        {
          id: 101,
          name: 'Action',
          slug: 'action',
          description: 'Explosive thrillers and high-octane blockbusters.',
          image: 'https://images.unsplash.com/photo-1602524812220-584b3e894f9f?auto=format&fit=crop&w=600&q=80',
          status: 'inactive',
        },
        {
          id: 102,
          name: 'Comedy',
          slug: 'comedy',
          description: 'Movies guaranteed to make you laugh.',
          image: 'https://images.unsplash.com/photo-1580250048427-55f6cbb4de7b?auto=format&fit=crop&w=600&q=80',
          status: 'active',
        },
      ],
    },
    {
      id: 2,
      name: 'Concerts',
      slug: 'concerts',
      description: 'Live performances from your favorite artists.',
      image: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=600&q=80',
      status: 'inactive',
      subcategories: [
        {
          id: 201,
          name: 'Pop',
          slug: 'pop',
          description: 'Top pop artists and dance beats.',
          image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80',
          status: 'active',
        },
      ],
    },
  ], []);

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
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
        cell: ({ row }) => (
          <Badge variant={row.original.status === 'active' ? 'default' : 'outline'}>
            {row.original.status}
          </Badge>
        ),
      },
    ],
    [expandedRows]
  );

  const data = React.useMemo(() => {
    const flatData = [];
    for (const category of mockCategories) {
      flatData.push({ ...category, type: 'category' });
      if (expandedRows[category.id] && Array.isArray(category.subcategories)) {
        flatData.push(
          ...category.subcategories.map((sub) => ({
            ...sub,
            parentId: category.id,
            type: 'subcategory',
          }))
        );
      }
    }
    return flatData;
  }, [mockCategories, expandedRows]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => `${row.type}-${row.id}`,
  });

  return (
    <div>
<div className='flex justify-between p-4 items-center '>
  <h1 className='text-3xl font-medium'>Categories</h1>
  <Button onClick={()=>{router.push('/Categories/AddCategory')}}>Add Category</Button>
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
    </div>
  );
};

export default CategoriesTable;
