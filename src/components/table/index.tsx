import * as React from 'react';
import {ChevronDownIcon, DotsHorizontalIcon} from '@radix-ui/react-icons';
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	Input,
	Checkbox,
	Button,
} from '@/components/ui';
const generateStudents = (): Student[] => {
	const students: Student[] = [];

	for (let i = 1; i <= 30; i++) {
		const student: Student = {
			id: `student-${i}`,
			name: `Student ${i}`,
			lastname: `Lastname ${i}`,
			email: `student${i}@example.com`,
			enrolledCourses: Math.floor(Math.random() * 10) + 1,
			progress: Math.floor(Math.random() * 100) + 1,
		};

		students.push(student);
	}

	return students;
};

const data: Student[] = generateStudents();

export type Student = {
	id: string;
	name: string;
	lastname: string;
	email: string;
	enrolledCourses: number;
	progress: number;
};

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
		accessorKey: 'lastname',
		header: 'Lastname',
		cell: ({row}) => (
			<div className="capitalize">{row.getValue('lastname')}</div>
		),
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({row}) => <div>{row.getValue('email')}</div>,
	},
	{
		accessorKey: 'enrolledCourses',
		header: 'Enrolled Courses',
		cell: ({row}) => <div>{row.getValue('enrolledCourses')}</div>,
	},
	{
		accessorKey: 'progress',
		header: 'Progress',
		cell: ({row}) => (
			<div className="flex items-center">
				<div className="w-24 mr-2">
					<div className="h-2 bg-gray-200 rounded-full">
						<div
							className="h-full bg-primary-500 rounded-full"
							style={{width: `${row.getValue('progress')}%`}}
						/>
					</div>
				</div>
				<div>{row.getValue('progress')}%</div>
			</div>
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

export function CustomTable() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</TableHead>
							);
						})}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && 'selected'}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell colSpan={columns.length} className="h-24 text-center">
							No results.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
