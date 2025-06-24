'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

// Schema for validation
const userSchema = z.object({
  username: z
    .string()
    .min(2, 'Username must be at least 2 characters')
    .max(30, 'Username must not exceed 30 characters')
    .regex(/^[A-Za-z\s]+$/, 'Only letters and spaces allowed'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
});

type FormData = z.infer<typeof userSchema>;

const roles = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
  { label: 'HR Manager', value: 'hr' },
];

const columns: ColumnDef<User>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'username', header: 'User Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
];

export default function UsersPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: '',
      email: '',
      role: '',
    },
  });

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      const newUser = {
        id: Date.now(),
        ...data,
      };
      setUsers((prev) => [...prev, newUser]);
      toast.success('User added successfully');
      setOpen(false);
      reset();
    } catch (error: any) {
      toast.error('Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Users</h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className='cursor-pointer'>Add User</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[400px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4 pb-6">
              <div>
                <Label htmlFor="username" className="mb-2 block">
                  User Name
                </Label>
                <Input id="username" {...register('username')} />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="mb-2 block">
                  Email
                </Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="role" className="mb-2 block">
                  Role
                </Label>
                <Select
                  onValueChange={(val) => setValue('role', val)}
                  defaultValue=""
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                )}
              </div>

              <Button type="submit" disabled={loading} className="w-full mt-4 cursor-pointer">
                {loading ? 'Submitting...' : 'Add User'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No users available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
