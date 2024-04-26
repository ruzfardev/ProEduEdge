import {CustomTable} from '@/components/table';
import {
	Button,
	Checkbox,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Input,
} from '@/components/ui';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {getStudentsAction} from '@/redux/features/users/slice';
import {ColumnDef} from '@tanstack/react-table';
import {Student} from '@/redux/features/users/types';
import {DotsHorizontalIcon} from '@radix-ui/react-icons';

export const columns: ColumnDef<Student>[] = [
	{
		id: 'select',
		header: ({table}) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({row}) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({row}) => <div className="capitalize">{row.getValue('name')}</div>,
	},
	{
		accessorKey: 'lastName',
		header: 'Lastname',
		cell: ({row}) => (
			<div className="capitalize">{row.getValue('lastName')}</div>
		),
	},
	{
		id: 'actions',
		header: 'Actions',
		enableHiding: false,
		cell: ({row}) => {
			const payment = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<DotsHorizontalIcon className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(payment.id)}
						>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
export const StudentList = () => {
	const dispatch = useAppDispatch();
	const {
		students: {data, errors, isLoading},
	} = useAppSelector((state) => state.users);
	useEffect(() => {
		dispatch(getStudentsAction());
	}, []);
	return (
		<div className="dashboard-table mt-5">
			{isLoading && <div>Loading...</div>}
			<div className="flex items-center pb-4">
				<Input
					placeholder="Filter students..."
					// value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
					// onChange={(event) =>
					// 	table.getColumn('email')?.setFilterValue(event.target.value)
					// }
					className="max-w-sm"
				/>
			</div>
			<div className="w-full rounded-md no-scrollbar max-h-[calc(100vh-300px)] overflow-scroll border">
				<CustomTable columns={columns} data={data} loading={isLoading} />
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{/* {table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected. */}
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						// onClick={() => table.previousPage()}
						// disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						// onClick={() => table.nextPage()}
						// disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};
