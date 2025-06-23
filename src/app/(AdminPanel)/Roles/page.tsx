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
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const permissionList = ['View', 'Edit', 'Delete'];

type Role = {
  id: number;
  name: string;
  permissions: string[];
  status: boolean;
};

const roleSchema = z.object({
  name: z.string().min(2, 'Role name is required'),
  permissions: z.array(z.string()).min(1, 'At least one permission is required'),
});

type RoleFormData = z.infer<typeof roleSchema>;

const columns: ColumnDef<Role>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Role Name' },
  {
    accessorKey: 'permissions',
    header: 'Permissions',
    cell: ({ row }) => (
      <ul className="list-none list-inside text-xs flex gap-3">
        {(row.getValue('permissions') as string[]).map((p) => (
          <li key={p} className='px-2 border-1 border-black-100 rounded-sm' >{p}</li>
        ))}
      </ul>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span className={row.original.status ? 'text-green-600' : 'text-gray-500'}>
        {row.original.status ? 'Active' : 'Inactive'}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button size="sm" variant="outline" onClick={() => handleEdit(row.original)}>
          Edit
        </Button>
        <Button size="sm" variant="destructive" onClick={() => handleDelete(row.original.id)}>
          Delete
        </Button>
      </div>
    ),
  },
];

let handleEdit = (_role: Role) => {};
let handleDelete = (_id: number) => {};

export default function RolesPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: 'Admin', permissions: ['View', 'Edit', 'Delete'], status: true },
    { id: 2, name: 'Editor', permissions: ['View', 'Edit'], status: true },
    { id: 3, name: 'Viewer', permissions: ['View'], status: false },
  ]);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: '',
      permissions: [],
    },
  });

  const table = useReactTable({
    data: roles,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onSubmit = async (data: RoleFormData) => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 800));
      if (editingRole) {
        const updated = { ...editingRole, ...data };
        setRoles((prev) => prev.map((r) => (r.id === editingRole.id ? updated : r)));
        toast.success('Role updated');
      } else {
        const newRole = {
          id: Date.now(),
          ...data,
          status: true,
        };
        setRoles((prev) => [...prev, newRole]);
        toast.success('Role added');
      }
      reset();
      setEditingRole(null);
      setOpen(false);
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const selectedPermissions = watch('permissions');

  const handleCheckboxChange = (perm: string) => {
    const current = new Set(selectedPermissions);
    current.has(perm) ? current.delete(perm) : current.add(perm);
    setValue('permissions', Array.from(current));
  };

  handleEdit = (role: Role) => {
    setValue('name', role.name);
    setValue('permissions', role.permissions);
    setEditingRole(role);
    setOpen(true);
  };

  handleDelete = (id: number) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
    toast.success('Role deleted');
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Roles</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>{editingRole ? 'Edit Role' : 'Add Role'}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingRole ? 'Edit Role' : 'Add New Role'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4 pb-6">
              <div>
                <Label htmlFor="name" className='mb-2'>Role Name</Label>
                <Input id="name" {...register('name')} />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label className="mb-2 block">Permissions</Label>
                <div className="grid grid-cols-2 gap-2">
                  {permissionList.map((perm) => (
                    <label key={perm} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedPermissions.includes(perm)}
                        onCheckedChange={() => handleCheckboxChange(perm)}
                      />
                      <span className="text-sm">{perm}</span>
                    </label>
                  ))}
                </div>
                {errors.permissions && (
                  <p className="text-red-500 text-sm mt-1">{errors.permissions.message}</p>
                )}
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Submitting...' : editingRole ? 'Update Role' : 'Add Role'}
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
                  No roles available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
