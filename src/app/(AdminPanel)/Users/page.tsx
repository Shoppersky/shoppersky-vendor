
'use client';

import { useEffect, useState } from 'react';
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
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTitle, AlertDialogDescription, AlertDialogTrigger } from '@/components/ui/alert-dialog';

import axiosInstance from '@/lib/axiosInstance';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 🔹 User type
type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  role_name: string;
  is_active: boolean
};

// 🔹 Role type
type Role = {
  role_id: string;
  role_name: string;
};

// 🔹 Form validation schema
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

export default function UsersPage() {
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [switchOpen, setSwitchOpen] = useState(false);

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

  const fetchRoles = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/roles/?is_active=false');
      setRoles(response.data.data);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/admin-users/admin-users/');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  const table = useReactTable({
    data: users,
    columns: [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'username', header: 'User Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role_name', header: 'Role' },
     {
  id: 'switchStatus',
  header: 'Status',
  cell: ({ row }) => {
    const user = row.original;
    return (
      <div className="flex items-center gap-2">
        <Switch
          checked={!(user.is_active)}
          onCheckedChange={() => {
            setSelectedUser(user);
            setSwitchOpen(true);
          }}
        />
        <span className="text-sm">
          {user.is_active ? ' Inactive  ' : 'Active'}
        </span>
      </div>
    );
  },
},

      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditingUser(row.original);
                setOpen(true);
                setValue('username', row.original.username);
                setValue('email', row.original.email);
                setValue('role', row.original.role_id);
              }}
            >
              Edit
            </Button>
          
          </div>
        ),
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  // const onSubmit = async (data: FormData) => {
  //   setLoading(true);
  //   const formData = new FormData();
  //   formData.append('username', data.username);
  //   formData.append('email', data.email);
  //   formData.append('role_id', data.role);

  //   try {
  //     if (editingUser) {
  //       const response = await axiosInstance.put(
  //         `/api/v1/admin-users/${editingUser.id}`,
  //         formData,
  //         { headers: { 'Content-Type': 'multipart/form-data' } }
  //       );
  //       if (response.data.statusCode === 200) {
  //         toast.success('User updated successfully');
  //       }
  //     } else {
  //       const response = await axiosInstance.post(
  //         '/api/v1/admin-users/register',
  //         formData,
  //         { headers: { 'Content-Type': 'multipart/form-data' } }
  //       );
  //       if (response.data.statusCode === 201) {
  //         toast.success('User added successfully');
  //       }
  //     }

  //     fetchUsers();
  //   } catch (error: any) {
  //     const { data, status } = error.response;
  //     if (status === 409 || status === 403) {
  //       toast.error(data.detail.message);
  //     } else {
  //       toast.error('Operation failed');
  //     }
  //   } finally {
  //     setLoading(false);
  //     reset();
  //     setOpen(false);
  //     setEditingUser(null);
  //   }
  // };

const onSubmit = async (data: FormData) => {
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('role_id', data.role);

    if (editingUser) {
       formData.append('new_username', data.username);
  
    formData.append('new_role_id', data.role);

try{
  const response = await axiosInstance.put(
        `/api/v1/admin-users/update-user/${editingUser.user_id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data.statusCode === 200) {
        toast.success('User updated successfully');
        fetchUsers();
      }
}
  catch(error){
    console.log(error.response)
    const{data,status}=error.response
    if(status==400){
      toast.error(data.detail.message)
    }else{
      toast.error(data.detail.message)
    }
  }  

    } else {
      // 🔹 Create new user
      const response = await axiosInstance.post(
        '/api/v1/admin-users/register',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data.statusCode === 201) {
        toast.success('User added successfully');
        fetchUsers();
      }
    }

  } catch (error: any) {
    const { data, status } = error.response || {};
    if (status === 409 || status === 403) {
      toast.error(data?.detail?.message || 'Conflict');
    } else {
      toast.error('Operation failed');
    }
  } finally {
    setLoading(false);
    reset();
    setOpen(false);
    setEditingUser(null);
  }
};



  return (
    <div className="p-3 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Users</h2>

        <Dialog
          open={open}
          onOpenChange={(state) => {
            setOpen(state);
            if (!state) {
              reset();
              setEditingUser(null);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="cursor-pointer">Add User</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[400px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
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
                  defaultValue={editingUser ? editingUser.role_id : ''}
                  value={editingUser?.role_id}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.role_id} value={role.role_id}>
                        {role.role_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
                )}
              </div>

              <Button type="submit" disabled={loading} className="w-full mt-4">
                {loading
                  ? editingUser
                    ? 'Updating...'
                    : 'Submitting...'
                  : editingUser
                    ? 'Update User'
                    : 'Add User'}
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
                <TableCell colSpan={5} className="text-center">
                  No users available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
 <AlertDialog open={switchOpen} onOpenChange={setSwitchOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Change User Status</AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure you want to{' '}
        <span className="font-semibold">
          {selectedUser?.is_active ? 'activate ' : 'deactivate'}
        </span>{' '}
        this user?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel
        onClick={() => {
          setSelectedUser(null);
        }}
      >
        Cancel
      </AlertDialogCancel>
      <AlertDialogAction
        onClick={async () => {
          if (!selectedUser) return;

          const endpoint = !selectedUser.is_active
            ? `/api/v1/admin-users/soft-delete/${selectedUser.user_id}`
            : `/api/v1/admin-users/restore/${selectedUser.user_id}`;

          try {
            await axiosInstance.patch(endpoint);
            toast.success(
              `User ${selectedUser.is_active ? ' activated  ' : 'deactivated'} successfully`
            );
            fetchUsers();
          } catch (error) {
            toast.error('Failed to update status');
          } finally {
            setSwitchOpen(false);
            setSelectedUser(null);
          }
        }}
      >
        Confirm
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


    </div>
  );
}
